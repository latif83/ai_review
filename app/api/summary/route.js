import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Query counts for students, classes, and teachers
    const [studentsCount, classesCount, teachersCount] = await Promise.all([
      prisma.students.count(),
      prisma.Classes.count(),
      prisma.Teachers.count(),
    ]);

    return NextResponse.json(
      {
        students: studentsCount,
        classes: classesCount,
        teachers: teachersCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching counts:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
