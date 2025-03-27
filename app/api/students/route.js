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
      orderBy: {
        createdAt: "desc",
      },
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


export async function PUT(req) {
  try {
    // Parse request body for updated student data
    const { studentId, fName, lName, classId, classSectionsId } =
      await req.json();

    // Check if studentId is provided
    if (!studentId) {
      return NextResponse.json(
        { message: "Student ID is required!" },
        { status: 400 }
      );
    }

    // Check if the student exists
    const existingStudent = await prisma.students.findUnique({
      where: { studentId },
    });

    if (!existingStudent) {
      return NextResponse.json(
        { message: "Student not found!" },
        { status: 404 }
      );
    }

    // Update the student details
    await prisma.students.update({
      where: { studentId },
      data: {
        fName: fName || existingStudent.fName,
        lName: lName || existingStudent.lName,
        classId: classId || existingStudent.classId,
        classSectionsId: classSectionsId || existingStudent.classSectionsId,
      },
    });

    return NextResponse.json(
      { message: "Student details updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating student:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    // Parse request body to get studentId
    const { studentId } = await req.json();

    // Check if studentId is provided
    if (!studentId) {
      return NextResponse.json(
        { message: "Student ID is required!" },
        { status: 400 }
      );
    }

    // Check if the student exists
    const existingStudent = await prisma.students.findUnique({
      where: { id : Number(studentId)  },
    });

    if (!existingStudent) {
      return NextResponse.json(
        { message: "Student not found!" },
        { status: 404 }
      );
    }
    // Delete the student
    await prisma.students.delete({
      where: { id : Number(studentId) },
    });

    return NextResponse.json(
      { message: "Student deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
