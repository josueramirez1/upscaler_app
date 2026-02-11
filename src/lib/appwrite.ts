import {
  Client,
  TablesDB,
  Account,
  ID,
  Query,
  Permission,
  Role,
} from "appwrite";
import type { KanbanColumn, KanbanListRow, KanbanTaskRow } from "@/types/task";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);

const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const LISTS_TABLE_ID = import.meta.env.VITE_APPWRITE_LISTS_ID;
const TASKS_TABLE_ID = import.meta.env.VITE_APPWRITE_TASKS_ID;
const BOARDS_TABLE_ID = import.meta.env.VITE_APPWRITE_BOARDS_TABLE_ID;

export const ensureUserBoard = async (userId: string) => {
  try {
    const existingBoards = await tablesDB.listRows({
      databaseId: DB_ID,
      tableId: BOARDS_TABLE_ID,
      queries: [Query.equal("ownerId", userId)],
    });

    if (existingBoards.rows.length > 0) {
      return existingBoards.rows[0];
    }

    const privatePermissions = [
      Permission.read(Role.user(userId)),
      Permission.write(Role.user(userId)),
      Permission.update(Role.user(userId)),
      Permission.delete(Role.user(userId)),
    ];

    const newBoard = await tablesDB.createRow({
      databaseId: DB_ID,
      tableId: BOARDS_TABLE_ID,
      rowId: ID.unique(),
      data: {
        ownerId: userId,
        name: "My Personal Board",
      },
      permissions: privatePermissions,
    });

    const defaultColumns = [
      { title: "Backlog", position: 0, color: "red" },
      { title: "Todo", position: 1, color: "yellow" },
      { title: "In Progress", position: 2, color: "orange" },
      { title: "In Review", position: 3, color: "blue" },
      { title: "Done", position: 4, color: "green" },
    ];

    await Promise.all(
      defaultColumns.map((col) =>
        tablesDB.createRow({
          databaseId: DB_ID,
          tableId: LISTS_TABLE_ID,
          rowId: ID.unique(),
          data: {
            name: col.title,
            boardId: newBoard.$id,
            position: col.position,
            color: col.color,
          },
          permissions: privatePermissions,
        }),
      ),
    );

    return newBoard;
  } catch (error) {
    console.error("Error in ensureUserBoard:", error);
    throw error;
  }
};

export const getBoardData = async (
  boardId: string | null,
): Promise<KanbanColumn[]> => {
  if (!boardId) return [];

  const listsResponse = await tablesDB.listRows<KanbanListRow>({
    databaseId: DB_ID,
    tableId: LISTS_TABLE_ID,
    queries: [Query.equal("boardId", boardId), Query.orderAsc("position")],
  });

  const tasksResponse = await tablesDB.listRows<KanbanTaskRow>({
    databaseId: DB_ID,
    tableId: TASKS_TABLE_ID,
    queries: [
      Query.equal("boardId", boardId),
      Query.orderAsc("position"),
      Query.limit(255),
    ],
  });

  return listsResponse.rows.map((list) => ({
    id: list.$id,
    title: list.name,
    color: (list as any).color ?? "primary",
    items: tasksResponse.rows
      .filter((task) => task.listId === list.$id)
      .map((task) => ({
        id: task.$id,
        title: task.title,
      })),
  }));
};

export const addTask = async (
  title: string,
  listId: string,
  boardId: string,
  userId: string,
) => {
  // 1. Correctly FETCH the existing tasks to find the next position
  const existingTasks = await tablesDB.listRows<KanbanTaskRow>({
    databaseId: DB_ID,
    tableId: TASKS_TABLE_ID,
    queries: [
      Query.equal("listId", listId),
      Query.equal("boardId", boardId), // Ensure we only look at THIS board
      Query.orderDesc("position"),
      Query.limit(1),
    ],
  });

  const nextPosition =
    existingTasks.rows.length > 0
      ? (existingTasks.rows[0].position ?? 0) + 1
      : 0;

  const permissions = [
    Permission.read(Role.user(userId)),
    Permission.write(Role.user(userId)),
    Permission.update(Role.user(userId)),
    Permission.delete(Role.user(userId)),
  ];

  return await tablesDB.createRow({
    databaseId: DB_ID,
    tableId: TASKS_TABLE_ID,
    rowId: ID.unique(),
    data: {
      title,
      listId,
      boardId,
      position: nextPosition,
    },
    permissions,
  });
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

const createColumn = async (
  title: string,
  boardId: string,
  position: number,
  userId: string,
) => {
  return await tablesDB.createRow({
    databaseId: DB_ID,
    tableId: LISTS_TABLE_ID,
    rowId: ID.unique(),
    data: { name: title, boardId, position },
    permissions: [
      Permission.read(Role.user(userId)),
      Permission.write(Role.user(userId)),
      Permission.update(Role.user(userId)),
      Permission.delete(Role.user(userId)),
    ],
  });
};

export { client, ID, Query, createColumn };
