import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function POST(req, { params }) {
  try {
    // extract body params
    const { comment, by, subjectId, academicTerm, academicYr } =
      await req.json();

    // console.log({comment,by,subjectId,academicTerm,academicYr})

    const { studentId } = await params;

    const student = await prisma.students.findUnique({
      where: {
        id: parseInt(studentId),
      },
    });

    if (!comment) {
      return NextResponse.json(
        { message: "Please provide the required params." },
        { status: 400 }
      );
    }

    const checkExistingComment = await prisma.Comments.findFirst({
      where: {
        academicTerm,
        academicYr,
        studentId: student.studentId,
        subjectId,
      },
    });

    // console.log({ checkExistingComment });

    if (checkExistingComment) {
      return NextResponse.json(
        {
          message: "Comment already exists for this student!",
        },
        { status: 400 }
      );
    }

    const createComment = await prisma.Comments.create({
      data: {
        academicYr,
        academicTerm,
        comment,
        studentId: student.studentId,
        by,
        subjectId,
      },
    });

    if (!createComment) {
      return NextResponse.json(
        {
          message:
            "Unexpected error while creating comment, please try again later.",
        },
        { status: 400 }
      );
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
