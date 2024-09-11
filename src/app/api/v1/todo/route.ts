import { connectToDatabase } from "@/app/lib/mongodb";
import Todo from "@/app/models/todo";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const todoResult = await Todo.find({});
    return NextResponse.json({ data: todoResult });
  } catch (err) {
    return NextResponse.json({
      error: err,
    });
  }
}
