import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { toast } from "react-toastify";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const { studentId } = await params;

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
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Fetch previous comments for the student
    const comments = await prisma.Comments.findMany({
      where: { studentId: student.studentId },
      orderBy: { createdAt: "desc" }, // Sort by latest academic year
    });

    return NextResponse.json({ student, comments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching student and comments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  try {
    // extract body params
    const { comment, by, academicTerm, academicYr, targetLanguage } =
      await req.json();

    // console.log({comment,by})

    const { studentId } = await params;

    console.log({
      comment,
      by,
      academicTerm,
      academicYr,
      targetLanguage,
      studentId,
    });

    const student = await prisma.students.findUnique({
      where: {
        id: parseInt(studentId),
      },
    });

    const commentKey = targetLanguage === "English" ? "comment" : "fComment";

    console.log([commentKey]);

    if (!comment) {
      return NextResponse.json(
        { message: "Please provide the required params." },
        { status: 400 }
      );
    }

    const existingComment = await prisma.Comments.findFirst({
      where: {
        academicYr,
        academicTerm,
        studentId: student.studentId,
      },
    });

    if (existingComment) {
      // update comment
      if (targetLanguage === "English" && existingComment.comment && existingComment.comment !== "N/A") {
        return NextResponse.json(
          { message: "Comment already exists for this student in English." },
          { status: 400 }
        );
      } else if (targetLanguage === "French" && existingComment.fComment) {
        return NextResponse.json(
          { message: "Comment already exists for this student in French." },
          { status: 400 }
        );
      }

      await prisma.Comments.update({
        where: { id: existingComment.id },
        data: {
          [commentKey]: comment,
          by,
        },
      });

    } else {
      targetLanguage === "English" ? await prisma.Comments.create({
        data: {
          academicYr,
          academicTerm,
          comment,
          studentId: student.studentId,
          by,
        },
      }) : await prisma.Comments.create({
        data: {
          academicYr,
          academicTerm,
          comment : 'N/A',
          fComment: comment,
          studentId: student.studentId,
          by,
        },
      })
    }

    return NextResponse.json(
      { message: "Comment created successful!" },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    toast.error("Internal Server Error!");
  }
}

export async function PUT(req) {
  try {
    // Extract body params
    const { approvedBy, commentId } = await req.json();
    // const { commentId } = params;

    console.log({ approvedBy, commentId });

    if (!approvedBy) {
      return NextResponse.json(
        { message: "Please provide the approvedBy field." },
        { status: 400 }
      );
    }

    const updateComment = await prisma.Comments.update({
      where: {
        id: commentId,
      },
      data: {
        ApprovedBy: approvedBy,
      },
    });

    if (!updateComment) {
      return NextResponse.json(
        { message: "Error updating comment approval, please try again later." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Comment approved successfully!" },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
}
