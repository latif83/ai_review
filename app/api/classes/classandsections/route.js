import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

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
          ClassSections: {
            select: {
              sectionName: true,
            },
          }
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