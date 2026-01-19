import type { Models } from "appwrite";

export interface KanbanList extends Models.Row {
  name: string;
  position: number;
  boardId: string;
  tasks: KanbanTask[];
}

export interface KanbanTask extends Models.Row {
  title: string;
  content?: string;
  position: number;
  listId: string;
  boardId: string;
}
