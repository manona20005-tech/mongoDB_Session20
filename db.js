import { MongoClient } from "mongodb";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const client = new MongoClient(
  "mongodb+srv://manona20005_db_user:Menna12345@cluster0.xjjkzda.mongodb.net/"
);

export async function connectToMongoDB() {
  await client.connect();
  console.log("You successfully connected to MongoDB!");
  return client;
}

export async function disconnectFromMongoDB() {
  await client.close();
}