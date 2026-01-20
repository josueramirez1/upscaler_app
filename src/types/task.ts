import type { Models } from "appwrite";

export interface KanbanListRow extends Models.Row {
  name: string; // matches Appwrite schema
  position: number;
  color?: string; // optional until you add it
}

export interface KanbanTaskRow extends Models.Row {
  title: string;
  content?: string;
  position: number;
  listId: string; // relation or string
  boardId: string; // if you keep boards
}

export interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  items: KanbanItem[];
}

export interface KanbanItem {
  id: string;
  title: string;
}
