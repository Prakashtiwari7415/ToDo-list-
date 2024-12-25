import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Check, Trash2, Clock } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onUpdate: () => void;
  onDelete: () => void;
}

export function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleComplete = async () => {
    const { error } = await supabase
      .from('todos')
      .update({ completed: !todo.completed })
      .eq('id', todo.id);

    if (!error) {
      onUpdate();
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', todo.id);

    if (!error) {
      onDelete();
    }
    setIsDeleting(false);
  };

  const isOverdue = todo.due_date && !todo.completed && new Date(todo.due_date) < new Date();

  const categoryColors = {
    personal: 'bg-purple-100 text-purple-800',
    work: 'bg-blue-100 text-blue-800',
    shopping: 'bg-green-100 text-green-800',
    health: 'bg-red-100 text-red-800',
    other: 'bg-gray-100 text-gray-800'
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  return (
    <div 
      className={`group flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 
        ${isDeleting ? 'opacity-50' : ''} 
        ${todo.completed ? 'bg-gray-50' : ''}`}
    >
      <div className="flex items-center space-x-4 flex-1">
        <button
          onClick={toggleComplete}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
            ${todo.completed 
              ? 'bg-green-500 border-green-500 hover:bg-green-600' 
              : 'border-gray-300 hover:border-blue-500'}`}
        >
          {todo.completed && <Check className="w-4 h-4 text-white" />}
        </button>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className={`text-gray-700 transition-all duration-200 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
              {todo.title}
            </span>
            {todo.category && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[todo.category as keyof typeof categoryColors]}`}>
                {todo.category}
              </span>
            )}
            {todo.priority && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[todo.priority as keyof typeof priorityColors]}`}>
                {todo.priority}
              </span>
            )}
          </div>
          
          {todo.due_date && (
            <div className="flex items-center space-x-1 mt-1">
              <Clock className={`w-4 h-4 ${isOverdue ? 'text-red-500' : 'text-gray-400'}`} />
              <span className={`text-sm ${isOverdue ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                {new Date(todo.due_date).toLocaleDateString()}
                {isOverdue && ' (Overdue)'}
              </span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-gray-400 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}