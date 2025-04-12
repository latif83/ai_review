import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { subjectId, name } = await req.json();
    if (!subjectId || !name) {
      return NextResponse.json(
        { message: "Please fill in the required fields!" },
        { status: 400 }
      );
    }

    await prisma.subjects.create({
      data: {
        subjectId,
        name,
      },
    });

    return NextResponse.json(
      { message: "New subject created successfully!" },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subjects = await prisma.subjects.findMany();
    return NextResponse.json({ subjects }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}
