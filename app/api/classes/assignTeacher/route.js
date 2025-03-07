import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    // Parse request body
    const { sectionId, teacherId } = await req.json();

    // Validate input
    if (!sectionId || !teacherId) {
      return NextResponse.json(
        { message: "Missing required fields!" },
        { status: 400 }
      );
    }

    // Update the class section with the new teacherId
    await prisma.ClassSections.update({
      where: { id: sectionId },
      data: { teacherId },
    });

    return NextResponse.json(
      { message: "Teacher assigned successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating class section:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
