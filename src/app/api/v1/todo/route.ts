import { connectToDatabase } from "@/app/lib/mongodb";
import Todo from "@/app/models/todo";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const todoResult = await Todo.find();
    const listcollection = await mongoose.connection.db?.listCollections().toArray();
    console.log(listcollection?.map(x=>x.name));
    return NextResponse.json({ data: todoResult });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error: err,
    });
  }
}
