import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Loader2 } from 'lucide-react';
import { Category, Priority } from '../types/todo';

interface AddTodoProps {
  onAdd: () => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState<Category>('personal');
  const [priority, setPriority] = useState<Priority>('medium');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from('todos')
      .insert([{ 
        title: title.trim(),
        user_id: user.id,
        due_date: dueDate || null,
        category,
        priority
      }]);

    if (!error) {
      setTitle('');
      setDueDate('');
      setCategory('personal');
      setPriority('medium');
      onAdd();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-3 bg-white rounded-xl shadow-sm focus:shadow-md border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          disabled={loading}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-4 py-3 bg-white rounded-xl shadow-sm focus:shadow-md border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          disabled={loading}
        />
      </div>

      <div className="flex gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="px-4 py-2 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="shopping">Shopping</option>
          <option value="health">Health</option>
          <option value="other">Other</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="px-4 py-2 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Plus className="w-5 h-5" />
              <span>Add Task</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}