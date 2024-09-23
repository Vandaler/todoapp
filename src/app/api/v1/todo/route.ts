import { connectToDatabase } from "@/app/lib/mongodb";
import Todo from "@/app/models/todo";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

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

//req => {name:"", note:""}
export async function POST(req: NextResponse) {
  try{
  const body = await req.json();
  console.log("recive data:",body);
  const res = await Todo.create(body);
  return NextResponse.json({data: res})
} catch(error){
  return NextResponse.json({
    error : error,
  });
}
}


export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { _id, status } = body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const result = await Todo.updateOne({ _id }, { $set: { status } });

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Todo not found or status not updated" }, { status: 404 });
    }

    return NextResponse.json({ data: result });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}



export async function DELETE(req: NextRequest) {
  try {
    const { _id } = await req.json();
    const res = await Todo.deleteOne({ _id });
    if (res.deletedCount === 0) {
      return NextResponse.json({ error: "Todo not found" });
    }
    return NextResponse.json({ message: "Todo deleted" });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}