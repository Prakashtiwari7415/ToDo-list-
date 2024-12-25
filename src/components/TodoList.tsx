import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { TodoItem } from './TodoItem';
import { AddTodo } from './AddTodo';
import { DateFilter } from './DateFilter';
import { TaskFilters } from './TaskFilters';
import { TaskStats } from './TaskStats';
import { Loader2, ListTodo } from 'lucide-react';
import { Todo, Category, Priority } from '../types/todo';

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(null);

  const fetchTodos = async () => {
    let query = supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });

    if (selectedDate) {
      const startDate = new Date(selectedDate);
      const endDate = new Date(selectedDate);
      endDate.setDate(endDate.getDate() + 1);

      query = query
        .gte('created_at', startDate.toISOString())
        .lt('created_at', endDate.toISOString());
    }

    if (selectedCategory) {
      query = query.eq('category', selectedCategory);
    }

    if (selectedPriority) {
      query = query.eq('priority', selectedPriority);
    }

    const { data } = await query;
    
    if (data) {
      setTodos(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, [selectedDate, selectedCategory, selectedPriority]);

  useEffect(() => {
    const subscription = supabase
      .channel('todos')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'todos' }, fetchTodos)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
        <p className="text-gray-500">Loading your tasks...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <TaskStats todos={todos} />
      
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <AddTodo onAdd={fetchTodos} />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <DateFilter onDateChange={setSelectedDate} />
        <TaskFilters
          onCategoryChange={setSelectedCategory}
          onPriorityChange={setSelectedPriority}
          selectedCategory={selectedCategory}
          selectedPriority={selectedPriority}
        />
      </div>

      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 bg-white rounded-xl">
            <ListTodo className="w-12 h-12 mb-4" />
            <p className="text-lg">No tasks found</p>
            <p className="text-sm">
              {selectedDate || selectedCategory || selectedPriority
                ? 'Try adjusting your filters'
                : 'Add your first task above'}
            </p>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={fetchTodos}
              onDelete={fetchTodos}
            />
          ))
        )}
      </div>
    </div>
  );
}