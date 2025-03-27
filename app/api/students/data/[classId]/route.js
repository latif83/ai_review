import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    // Parse query parameters
    const { classId } = await params;

    const classData = await prisma.Classes.findUnique({
        where : {
            id : classId
        }
    })

    // Fetch students from the database
    const students = await prisma.students.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        classId,
      },
      select: {
        id: true,
        studentId: true,
        fName: true,
        lName: true,
        classId: true,
        classSectionsId: true,
        class: {
          select: {
            className: true, // Fetch class name
          },
        },
        ClassSections: {
          select: {
            sectionName: true, // Fetch class section name
          },
        },
      },
    });

    // Return the list of students
    return NextResponse.json({ students,classData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
