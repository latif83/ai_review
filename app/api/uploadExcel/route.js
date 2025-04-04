import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    // Parse request body from the data
    const { fileUrl, classId, academicTerm, academicYr } = await req.json();

    // Check if required fields are provided
    if (!fileUrl || !classId || !academicTerm || !academicYr) {
      return NextResponse.json(
        {
          message: "Missing required fields!",
        },
        { status: 400 }
      );
    }

    // Create the new student in the database
    await prisma.UploadExcel.create({
      data: {
        fileUrl,
        classId,
        academicTerm,
        academicYr,
      },
    });

    return NextResponse.json(
      { message: "Excel file uploaded successfully!" },
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
