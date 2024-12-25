import { Todo } from '../types/todo';
import { PieChart, CheckCircle2, Clock } from 'lucide-react';

interface TaskStatsProps {
  todos: Todo[];
}

export function TaskStats({ todos }: TaskStatsProps) {
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const completionRate = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;
  
  const overdueTasks = todos.filter(todo => {
    if (!todo.due_date || todo.completed) return false;
    return new Date(todo.due_date) < new Date();
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <PieChart className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Completion Rate</p>
            <p className="text-xl font-semibold text-gray-900">{completionRate}%</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Completed Tasks</p>
            <p className="text-xl font-semibold text-gray-900">{completedTasks}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <Clock className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Overdue Tasks</p>
            <p className="text-xl font-semibold text-gray-900">{overdueTasks}</p>
          </div>
        </div>
      </div>
    </div>
  );
}