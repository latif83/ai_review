import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    // Parse request body for techer data
    const { firstName, lastName, email } = await req.json();

    // Check if required fields are provided
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
        },
        { status: 400 }
      );
    }

    // Create the new student in the database
    await prisma.Teachers.create({
      data: {
        firstName,
        lastName,
        email,
        password: "ronsard@123",
      },
    });

    return NextResponse.json(
      { message: "New teacher added successfully!" },
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
    const teachers = await prisma.Teachers.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        classes: {
          select: {
            id: true, // Or className if you want the names too
          },
        },
      },
    });

    // Map teachers and add class count
    const result = teachers.map((teacher) => ({
      id: teacher.id,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      classCount: teacher.classes.length,
    }));

    return NextResponse.json({ teachers: result }, { status: 200 });
  } catch (error) {
    console.error("Error fetching teachers with class count:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function PUT(req) {
  try {
    // Parse request body for teacher data
    const { id, firstName, lastName, email } = await req.json();

    // Check if ID and at least one field to update is provided
    if (!id || (!firstName && !lastName && !email)) {
      return NextResponse.json(
        { message: "Missing required fields!" },
        { status: 400 }
      );
    }

    // Check if the teacher exists
    const teacherExists = await prisma.Teachers.findUnique({
      where: { id },
    });

    if (!teacherExists) {
      return NextResponse.json(
        { message: "Teacher not found!" },
        { status: 404 }
      );
    }

    // Update teacher in the database
    const updatedTeacher = await prisma.Teachers.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
      },
    });

    return NextResponse.json(
      { message: "Teacher updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating teacher:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    // Parse request body to get the teacher ID
    const { teacherId:id } = await req.json();

    // Check if the ID is provided
    if (!id) {
      return NextResponse.json(
        { message: "Teacher ID is required!" },
        { status: 400 }
      );
    }

    // Check if the teacher exists
    const teacherExists = await prisma.Teachers.findUnique({
      where: { id: id },
    });

    if (!teacherExists) {
      return NextResponse.json(
        { message: "Teacher not found!" },
        { status: 404 }
      );
    }

    // Delete the teacher from the database
    await prisma.Teachers.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { message: "Teacher deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting teacher:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
