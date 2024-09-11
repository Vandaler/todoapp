import { NextResponse } from "next/server";


interface TodoResult {
    name: string;
}

export async function GET() {
    const _result: TodoResult = {name: "Do homework"};
    return NextResponse.json(_result);
}