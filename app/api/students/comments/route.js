import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();

    const { subjectId, classId } = body;

    // console.log({ subjectId, classId })

    if (!body?.comments || !Array.isArray(body.comments)) {
      return NextResponse.json(
        { error: "Invalid request. 'comments' must be an array" },
        { status: 400 }
      );
    }
    // Fetch students in the specified class
    const studentsInClass = await prisma.students.findMany({
      where: {
        classId,
      },
      select: {
        id: true, // Assuming 'id' is the primary key for students
        studentId: true,
      },
    });

    // Create a Set of student IDs in the class for quick lookup
    const studentIdsInClass = new Set(
      studentsInClass.map((student) => student.studentId)
    );

    // Filter comments to include only those for students in the specified class
    body.comments = body.comments.filter((comment) =>
      studentIdsInClass.has(comment.studentId)
    );

    let newComments = [];
    let duplicateCount = 0;

    // console.log({comments:body.comments})

    for (const comment of body.comments) {
      const existingComment = await prisma.comments.findFirst({
        where: {
          studentId: comment.studentId,
          academicYr: comment.academicYr,
          academicTerm: comment.academicTerm,
        },
      });

      if (!existingComment) {
        if (!comment.comment) {
          continue;
        }

        newComments.push({
          studentId: comment.studentId,
          academicYr: comment.academicYr,
          academicTerm: comment.academicTerm,
          comment: comment.comment, // Allow different comments for the same student, term, and year
          subjectId: subjectId,
        });
      }
    }

    if (newComments.length > 0) {
      await prisma.comments.createMany({ data: newComments });

      return NextResponse.json(
        {
          message: `${newComments.length} new comments uploaded successfully! ${
            body.comments.length - newComments.length
          } duplicates found!`,
          added: newComments.length,
          skipped: body.comments.length - newComments.length,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          message: `All ${body.comments.length} comments are duplicates! No new comments were added.`,
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error inserting comments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
