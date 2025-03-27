import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { toast } from "react-toastify";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";


export async function GET(req, { params }) {
  try {
    const { studentId } =  await params;

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

    // Fetch previous comments for the student
    const comments = await prisma.Comments.findMany({
      where: { studentId: student.studentId },
      orderBy: { createdAt: "desc" }, // Sort by latest academic year
    });

    return NextResponse.json(
      { student, comments },
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

export async function POST(req,{params}){
    try{
        // extract body params
        const {comment,by} = await req.json()

        console.log({comment,by})

        const {studentId} = await params

        const student = await prisma.students.findUnique({
            where : {
                id : parseInt(studentId)
            }
        })

        if(!comment){

            return NextResponse.json(
                { message: "Please provide the required params." },
                { status: 400 }
              );
        }

        const createComment = await prisma.Comments.create({
            data : {
                academicYr : "2024/2025",
                academicTerm : "Term 2",
                comment,
                studentId : student.studentId,
                by
            }
        })

        if(!createComment){
            return NextResponse.json(
                { message: "Unexpected error while creating comment, please try again later." },
                { status: 400 }
              );
        }

        return NextResponse.json(
            { message: "Comment created successful!" },
            { status: 200 }
          );

    }catch(e){
        console.log(e)
        toast.error("Internal Server Error!")
    }
}

export async function PUT(req) {
  try {
      // Extract body params
      const { approvedBy,commentId } = await req.json();
      // const { commentId } = params;

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
            ApprovedBy:approvedBy,
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