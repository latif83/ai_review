import prisma from "@/config/prisma";
import { TurborepoAccessTraceResult } from "next/dist/build/turborepo-access-trace";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const { sectionId } = await params;

    const ClassData = await prisma.Classes.findUnique({
      where: {
        id: sectionId,
      },
    });

    // Get students in that class
    const students = await prisma.students.findMany({
      where: {
        classId: sectionId,
      },
      select: {
        id: true,
        studentId: true,
        fName: true,
        lName: true,
      },
    });

    // Final response
    return NextResponse.json(
      {
        subjectBasedComments: ClassData.subjectBasedComments,
        className: ClassData.className,
        students,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
