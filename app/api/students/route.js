import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    // Parse request body for student data
    const { studentId, fName, lName, classId, classSectionsId } =
      await req.json();

    // Check if required fields are provided
    if (!fName || !lName || !studentId || !classId || !classSectionsId) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
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
      { message: "New student added successfully!" },
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

export async function GET(req) {
    try {
      // Parse query parameters
    //   const { searchParams } = new URL(req.url);
    //   const classId = searchParams.get("classId");
    //   const classSectionsId = searchParams.get("classSectionsId");
  
      // Fetch students from the database
      const students = await prisma.students.findMany({
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
      return NextResponse.json({ students }, { status: 200 });
    } catch (error) {
      console.error("Error fetching students:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }