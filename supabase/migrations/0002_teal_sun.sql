/*
  # Add metadata columns to todos table

  1. New Columns
    - `due_date` (timestamptz, nullable) - For task deadlines
    - `category` (text, nullable) - For task categorization (personal, work, shopping, health, other)
    - `priority` (text, nullable) - For task priority levels (low, medium, high)

  2. Changes
    - Adds new columns to existing todos table
    - All columns are nullable to maintain compatibility with existing data
*/

DO $$ 
BEGIN
  -- Add due_date column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'todos' AND column_name = 'due_date'
  ) THEN
    ALTER TABLE todos ADD COLUMN due_date timestamptz;
  END IF;

  -- Add category column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'todos' AND column_name = 'category'
  ) THEN
    ALTER TABLE todos ADD COLUMN category text;
  END IF;

  -- Add priority column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'todos' AND column_name = 'priority'
  ) THEN
    ALTER TABLE todos ADD COLUMN priority text;
  END IF;

  -- Add check constraint for priority values
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage 
    WHERE table_name = 'todos' AND constraint_name = 'todos_priority_check'
  ) THEN
    ALTER TABLE todos ADD CONSTRAINT todos_priority_check 
      CHECK (priority IN ('low', 'medium', 'high'));
  END IF;

  -- Add check constraint for category values
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage 
    WHERE table_name = 'todos' AND constraint_name = 'todos_category_check'
  ) THEN
    ALTER TABLE todos ADD CONSTRAINT todos_category_check 
      CHECK (category IN ('personal', 'work', 'shopping', 'health', 'other'));
  END IF;
END $$;