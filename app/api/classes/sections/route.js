import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    // Parse request body for class data
    const { classId,sectionName } =
      await req.json();

    // Check if required fields are provided
    if (!sectionName || !classId) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
        },
        { status: 400 }
      );
    }

    // Create the new class in the database
    await prisma.ClassSections.create({
      data: {
        classId,
        sectionName
      },
    });

    return NextResponse.json(
      { message: "New section added successfully!" },
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
      const classSections = await prisma.ClassSections.findMany({
        select: {
          id: true,
          sectionName: true,
          classId : true
        },
      });
  
      // Return the list of students
      return NextResponse.json({ classSections }, { status: 200 });
    } catch (error) {
      console.error("Error fetching students:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }