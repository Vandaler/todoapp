import { NextResponse } from "next/server";

interface TodoResult {
  name: string;
}

export async function GET() {
  const _result: TodoResult = { name: "Do homework" };
  const _result1: TodoResult = { name: "Do somthing" };
  return NextResponse.json({ data: [_result, _result1] });
}
