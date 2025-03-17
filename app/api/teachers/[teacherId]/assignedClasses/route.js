import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    // Parse query parameters
    const { teacherId } = await params;

    // Validate the input
    if (!teacherId) {
      return NextResponse.json(
        { message: "Teacher ID is required" },
        { status: 400 }
      );
    }

    // Get assigned class sections for the teacher
    const assignedClassSections = await prisma.ClassSections.findMany({
      where: {
        teacherId,
      },
      include: {
        class: true
      },
    });

    // Check if the teacher has assigned class sections
    if (assignedClassSections.length === 0) {
      return NextResponse.json(
        { message: "No class assigned!" },
        { status: 404 }
      );
    }

    const results = assignedClassSections.map((assigned) => ({
      classSessionId: assigned.id,
      classId: assigned.class.id,
      className: assigned.class.className,
      classSectionName: assigned.sectionName,
    }));

    // Return the assigned class sections with subjects
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("Error fetching assigned class sections:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
