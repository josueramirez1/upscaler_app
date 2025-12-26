import { Client, Account, ID, Models } from "appwrite";

const client = new Client()
  .setEndpoint("https://sfo.cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("694e1ea50034c25852e4"); // Your project ID

const account = new Account(client);

export { client, account, ID, Models };
