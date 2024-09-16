import mongoose from "mongoose";


/*
mongodb+srv://panuwattha:HQzcoFdxaRTL8UR2@cluster0.gcmy4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
*/
//เอามาจาก MongoDB ของตัวเอง
const uri = process.env.MONGODB_URI;

let cachedDb: mongoose.Connection | null = null;

export async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  if(uri) {
  const opts = { dbName: "todo-app"};
  const conn = await mongoose.connect(uri, opts);
  cachedDb = conn.connection;
  return cachedDb;
} }