import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    const { classId, teacherId } = await req.json();

    if (!classId || !teacherId) {
      return NextResponse.json(
        { message: "Missing required fields!" },
        { status: 400 }
      );
    }

    // Connect the teacher to the class
    await prisma.Classes.update({
      where: { id: classId },
      data: {
        teachers: {
          connect: { id: teacherId },
        },
      },
    });

    return NextResponse.json(
      { message: "Teacher assigned successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error assigning teacher:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}