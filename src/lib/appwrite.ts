import { Client, TablesDB, Account, ID, Query } from "appwrite";

import { useAuth } from "@/contexts/useAuth";

import type { KanbanColumn, KanbanListRow, KanbanTaskRow } from "@/types/task";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) 
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);
///from here we can export the account where we need it to.

//This section is about fetching database
const tablesDB = new TablesDB(client);

const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const LISTS_TABLE_ID = import.meta.env.VITE_APPWRITE_LISTS_ID;
const TASKS_TABLE_ID = import.meta.env.VITE_APPWRITE_TASKS_ID;
const BOARD_ID = import.meta.env.VITE_APPWRITE_BOARD_ID;
const BOARD_TABLES_ID = import.meta.env.VITE_APPWRITE_BOARDS_TABLES_ID

export const getBoardData = async (): Promise<KanbanColumn[]> => {
  // 1. Fetch Lists (Columns) - using listRows
const {boardId} = useAuth()

if (!boardId) return [];

  const listsResponse = await tablesDB.listRows<KanbanListRow>({
    databaseId: DB_ID,
    tableId: LISTS_TABLE_ID,
    queries: [Query.equal("boardId", boardId), Query.orderAsc("position")],
  });

  // 2. Fetch Tasks (Rows) - using listRows
  const tasksResponse = await tablesDB.listRows<KanbanTaskRow>({
    databaseId: DB_ID,
    tableId: TASKS_TABLE_ID,
    queries: [
      Query.equal("boardId", boardId),
      Query.orderAsc("position"),
      Query.limit(255),
    ],
  });

  // 3. Grouping Logic
  const boardData: KanbanColumn[] = listsResponse.rows.map((list) => {
    return {
      id: list.$id,
      title: list.name,
      color: (list as any).color ?? "primary",
      // Filter the tasks by listId
      items: tasksResponse.rows
        .filter((task) => task.listId === list.$id)
        .map((task) => ({
          id: task.$id,
          title: task.title,
        })),
    };
  });

  return boardData;
};

export const moveTask = async (
  taskId: string,
  newListId: string,
  newPosition: number,
) => {
  return await tablesDB.updateRow({
    databaseId: DB_ID,
    tableId: TASKS_TABLE_ID,
    rowId: taskId,
    data: {
      listId: newListId,
      position: newPosition,
    },
  });
};

export const deleteTask = async (taskId: string) => {
  return await tablesDB.deleteRow({
    databaseId: DB_ID,
    tableId: TASKS_TABLE_ID,
    rowId: taskId,
  });
};

export const addTask = async (title: string, listId: string) => {

const {boardId} = useAuth()

if(!boardId) return []


  const existingTasks = await tablesDB.listRows<KanbanTaskRow>({
    databaseId: DB_ID,
    tableId: TASKS_TABLE_ID,
    queries: [
      Query.equal("listId", listId),
      Query.equal("boardId", boardId),
      Query.orderDesc("position"),
      Query.limit(1),
    ],
  });

  const nextPosition =
    existingTasks.rows.length > 0
      ? (existingTasks.rows[0].position ?? 0) + 1
      : 0;

  return await tablesDB.createRow({
    databaseId: DB_ID,
    tableId: TASKS_TABLE_ID,
    rowId: ID.unique(),
    data: {
      title,
      listId,
      boardId: BOARD_ID,
      position: nextPosition,
    },
  });
};

export const ensureUserBoard = async (userId: string) => {
  const existing = await tablesDB.listRows({
    databaseId: DB_ID,
    tableId: BOARD_TABLES_ID,
    queries: [Query.equal("ownerId", userId)],
  });

  if (existing.rows.length > 0) {
    return existing.rows[0];
  }

  return await tablesDB.createRow({
    databaseId: DB_ID,
    tableId: BOARD_TABLES_ID,
    rowId: ID.unique(),
    data: {
      name: "My Board",
      ownerId: userId,
    },
  });
}




export { client, account, ID, Query, };
