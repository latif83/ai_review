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