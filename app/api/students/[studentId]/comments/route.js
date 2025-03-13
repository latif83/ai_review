import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export async function GET(req,{params}) {
    try {
      // Parse query parameters
      const {studentId} = await params
  
      // Fetch students from the database
      const student = await prisma.students.findUnique({
        where : {
            id : parseInt(studentId)
        }
      });
  
      // Return the list of students
      return NextResponse.json({ student }, { status: 200 });
    } catch (error) {
      console.error("Error fetching student:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }


  export async function POST(req) {
    try {
      const body = await req.json();
  
      // Ensure body contains required fields
      if (!body || !body.comments || !Array.isArray(body.comments)) {
        return NextResponse.json(
          { message: "Invalid request. 'comments' must be an array." },
          { status: 400 }
        );
      }
  
      // Insert comments into the database
      const createdComments = await prisma.Comments.createMany({
        data: body.comments.map(comment => ({
          studentId: comment.studentId,
          academicYr: comment.academicYr,
          academicTerm: comment.academicTerm,
          comment: comment.comment
        })),
      });
  
      return NextResponse.json({ message : "Comments Uploaded Successfully!" }, { status: 201 });
    } catch (error) {
      console.error("Error inserting comments:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }