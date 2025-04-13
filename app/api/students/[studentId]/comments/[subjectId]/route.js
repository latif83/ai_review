import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { toast } from "react-toastify";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";


export async function GET(req, { params }) {
  try {
    const { studentId,subjectId } =  await params;

    // Convert studentId to integer
    const studentIdInt = parseInt(studentId);
    if (isNaN(studentIdInt)) {
      return NextResponse.json(
        { error: "Invalid student ID" },
        { status: 400 }
      );
    }

    // Fetch student details
    const student = await prisma.students.findUnique({
      where: { id: studentIdInt },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    const subject = await prisma.subjects.findUnique({
        where : {id:subjectId}
    })

    // Fetch previous comments for the student
    const comments = await prisma.Comments.findMany({
      where: { studentId: student.studentId,subjectId },
      orderBy: { createdAt: "desc" }, // Sort by latest academic year
    });

    return NextResponse.json(
      { student, comments,subject },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching student and comments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}