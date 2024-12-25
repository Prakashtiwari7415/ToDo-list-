import { Category, Priority } from '../types/todo';
import { Filter, Calendar } from 'lucide-react';

interface TaskFiltersProps {
  onCategoryChange: (category: Category | null) => void;
  onPriorityChange: (priority: Priority | null) => void;
  selectedCategory: Category | null;
  selectedPriority: Priority | null;
}

export function TaskFilters({
  onCategoryChange,
  onPriorityChange,
  selectedCategory,
  selectedPriority
}: TaskFiltersProps) {
  const categories: Category[] = ['personal', 'work', 'shopping', 'health', 'other'];
  const priorities: Priority[] = ['low', 'medium', 'high'];

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
    <div className="mb-6 space-y-4">
      <div className="flex items-center space-x-2">
        <Filter className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filters</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(selectedCategory === category ? null : category)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all
              ${selectedCategory === category 
                ? categoryColors[category]
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {priorities.map((priority) => (
          <button
            key={priority}
            onClick={() => onPriorityChange(selectedPriority === priority ? null : priority)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all
              ${selectedPriority === priority 
                ? priorityColors[priority]
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}