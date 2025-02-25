import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    // Parse request body for student data
    const {
        studentId,
        fName,
        lName,
        classId,
        classSectionsId,
    } = await req.json();

    // Check if required fields are provided
    if (!fName || !lName || !studentId || !classId || !classSectionsId) {
      return NextResponse.json(
        {
          message:
            "Missing required fields!",
        },
        { status: 400 }
      );
    }

    // Create the new student in the database
    await prisma.students.create({
      data: {
        studentId,
        fName,
        lName,
        classId,
        classSectionsId,
      },
    });

    return NextResponse.json(
      { message: "New sttudent added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}