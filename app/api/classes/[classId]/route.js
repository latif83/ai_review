import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function GET(req,{params}) {
    try {
      // Parse query parameters
      const {classId} = await params
  
      // Fetch students from the database
      const classSections = await prisma.ClassSections.findMany({
        where : {
            classId
        },
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