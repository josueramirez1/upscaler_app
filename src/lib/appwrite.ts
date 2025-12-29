import { Client, Account, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://sfo.cloud.appwrite.io/v1") //  API Endpoint
  .setProject("694e1ea50034c25852e4"); //  project ID

const account = new Account(client);

export { client, account, ID };
