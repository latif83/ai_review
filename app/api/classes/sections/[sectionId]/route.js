import prisma from "@/config/prisma";
import { TurborepoAccessTraceResult } from "next/dist/build/turborepo-access-trace";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    // Parse query parameters
    const { sectionId } = await params;

    // Fetch students from the database
    const classSections = await prisma.ClassSections.findUnique({
      where: {
        id: sectionId,
      },
      select: {
        sectionName: true,
        students: {
          select: {
            fName: true,
            lName: true,
            id: true,
            studentId: true,
          },
        },
        class: {
          select : {
            className: true
          }
        },
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
