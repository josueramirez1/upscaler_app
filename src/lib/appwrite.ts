import { Client, Account, ID, Query } from "appwrite";

import { KanbanList, KanbanTask } from "@/types/task";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) //  API Endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); //  project ID

const account = new Account(client);

export { client, account, ID };
