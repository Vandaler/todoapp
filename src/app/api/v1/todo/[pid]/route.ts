// import { connectToDatabase } from "@/app/lib/mongodb";
// import Todo from "@/app/models/todo";
// import { NextResponse } from "next/server";
// import mongoose from "mongoose";

// export async function GET(req: Request, { params }: { params: { pid: string } }) {
//     try {
//       const { pid } = params;
//       if (!mongoose.Types.ObjectId.isValid(pid)) {
//         return NextResponse.json({ error: "Invalid ID format" });
//       }
//       await connectToDatabase();
//       const todoResult = await Todo.findById(pid);
//       if (!todoResult) {
//         return NextResponse.json({ error: "Todo not found" });
//       }
//       return NextResponse.json({ data: todoResult });
//     } catch (err) {
//       return NextResponse.json({ error: err });
//     }
//   }

import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/app/lib/mongodb";
import Todo from "@/app/models/todo";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();
    const { id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ data: todo });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
