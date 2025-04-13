import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const { teacherId } = params;

    if (!teacherId) {
      return NextResponse.json(
        { message: "Teacher ID is required" },
        { status: 400 }
      );
    }

    // Fetch all classes where the teacher is assigned
    const assignedClasses = await prisma.Classes.findMany({
      where: {
        teachers: {
          some: {
            id: teacherId,
          },
        },
      },
      include: {
        ClassSections: true, // optionally include related class sections
      },
    });

    if (assignedClasses.length === 0) {
      return NextResponse.json(
        { message: "No classes assigned!" },
        { status: 404 }
      );
    }

    return NextResponse.json(assignedClasses, { status: 200 });
  } catch (error) {
    console.error("Error fetching assigned classes for teacher:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

