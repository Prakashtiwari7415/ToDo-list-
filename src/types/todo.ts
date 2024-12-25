export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
  due_date?: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
  user_id: string;
}

export type Priority = 'low' | 'medium' | 'high';
export type Category = 'personal' | 'work' | 'shopping' | 'health' | 'other';