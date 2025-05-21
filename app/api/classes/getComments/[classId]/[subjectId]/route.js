import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const { classId, subjectId } = await params;

    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const academicYr = searchParams.get("academicYr");
    const academicTerm = searchParams.get("academicTerm");

    // console.log({ academicYr, academicTerm });

    if (!academicYr || !academicTerm) {
      return NextResponse.json(
        { message: "Please select an academic calendar!" },
        { status: 400 }
      );
    }

    const classDetails = await prisma.Classes.findUnique({
      where: {
        id: classId,
      },
    });

    // Fetch students belonging to the given class
    const students = await prisma.students.findMany({
      where: { classId },
      select: { id: true, fName: true, lName: true, studentId: true }, // Select relevant fields
    });

    if (students.length === 0) {
      return NextResponse.json(
        { message: "No students found for this class." },
        { status: 404 }
      );
    }

    const subject = await prisma.subjects.findUnique({
      where: {
        id: subjectId,
      },
    });

    if (!subject) {
      return NextResponse.json(
        { message: "Subject not found." },
        { status: 404 }
      );
    }

    // Get student IDs
    const studentIds = students.map((student) => student.studentId);

    // Fetch comments for these students
    const comments = await prisma.Comments.findMany({
      where: {
        academicYr,
        academicTerm,
        subjectId,
        studentId: {
          in: studentIds,
        }, // Fetch comments where studentId matches
      },
      select: { studentId: true, comment: true, ApprovedBy: true },
    });

    const checkExcelFileUpload = await prisma.UploadExcel.findMany({
      where: {
        academicYr: "2024/2025",
        academicTerm: "Term 2",
      },
    });

    const fileUploaded = checkExcelFileUpload ? true : false;

    // Map comments to respective students
    const studentsWithComments = students.map((student) => ({
      ...student,
      comment:
        comments.find((comment) => comment.studentId === student.studentId)
          ?.comment || null, // Get the comment or null if not found
      ApprovedBy:
        comments.find((comment) => comment.studentId === student.studentId)
          ?.ApprovedBy || null,
    }));

    return NextResponse.json(
      {
        students: studentsWithComments,
        className: classDetails.className,
        subjectName: subject.name,
        fileUploaded,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching students and comments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
