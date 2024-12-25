import { useState } from 'react';
import { Calendar } from 'lucide-react';

interface DateFilterProps {
  onDateChange: (date: string | null) => void;
}

export function DateFilter({ onDateChange }: DateFilterProps) {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    onDateChange(date || null);
  };

  const handleClear = () => {
    setSelectedDate('');
    onDateChange(null);
  };

  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="relative flex-1">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      {selectedDate && (
        <button
          onClick={handleClear}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
        >
          Clear
        </button>
      )}
    </div>
  );
}