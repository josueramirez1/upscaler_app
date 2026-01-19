import { Models } from "appwrite";

// The "List" (Column)
export interface KanbanList extends Models.Document {
  name: string;
  position: number;
  boardId: string;
  // We add this array manually in the frontend to store the tasks for this column
  tasks: KanbanTask[];
}

// The "Task" (Card)
export interface KanbanTask extends Models.Document {
  title: string;
  content?: string;
  position: number;
  listId: string;
  boardId: string;
}
