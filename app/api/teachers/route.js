import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    // Parse request body for techer data
    const { firstName,lastName,email} = await req.json();

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
        firstName,lastName,email,password:"Def"
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
    // Parse query parameters

    // Fetch teachers from the database
    const teachers = await prisma.Teachers.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        classSections: {
          select: {
            sectionName: true, // Fetch class section name
          },
        },
      },
    });

    // Return the list of teachers
    return NextResponse.json({ teachers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}