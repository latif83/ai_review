import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    // Parse request body for class data
    const { className, subjectBasedComments } = await req.json();

    // Check if required fields are provided
    if (!className) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
        },
        { status: 400 }
      );
    }

    // Create the new class in the database
    await prisma.Classes.create({
      data: {
        className,
        subjectBasedComments,
      },
    });

    return NextResponse.json(
      { message: "New class added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding class:", error);
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
    const classes = await prisma.classes.findMany({
      select: {
        id: true,
        className: true,
        subjectBasedComments: true
      },
    });

    // Return the list of students
    return NextResponse.json({ classes }, { status: 200 });
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
    const { id, className, subjectBasedComments } = await req.json();

    // Validate required fields
    if (!id || !className) {
      return NextResponse.json(
        { message: "Missing required fields!" },
        { status: 400 }
      );
    }

    // Update the class in the database
    await prisma.Classes.update({
      where: { id },
      data: {
        className,
        subjectBasedComments,
      },
    });

    return NextResponse.json(
      { message: "Class updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating class:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Class ID is required!" },
        { status: 400 }
      );
    }

    // Check for associated students
    const studentsCount = await prisma.students.count({
      where: { classId: id },
    });

    // Check for associated teachers
    const teachersCount = await prisma.Classes.findUnique({
      where: { id },
      select: {
        teachers: true,
      },
    });

    if (studentsCount > 0 || (teachersCount?.teachers.length ?? 0) > 0) {
      return NextResponse.json(
        {
          message:
            "Cannot delete class. There are associated students or teachers. Please remove them first.",
        },
        { status: 409 } // Conflict
      );
    }

    // Delete the class
    await prisma.classes.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Class deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting class:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
