import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req,{params}) {
    try {
        
      const {classId} = await params;
  
      if (!classId) {
        return NextResponse.json({ message: "Class ID is required" }, { status: 400 });
      }
  
      const classWithTeachers = await prisma.Classes.findUnique({
        where: { id: classId },
        include: {
          teachers: true, // include all assigned teachers
        },
      });
  
      if (!classWithTeachers) {
        return NextResponse.json({ message: "Class not found" }, { status: 404 });
      }
  
      return NextResponse.json(classWithTeachers.teachers, { status: 200 });
    } catch (error) {
      console.error("Error fetching teachers for class:", error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }

  export async function PUT(req) {
    try {
      const { classId, teacherId } = await req.json();
  
      if (!classId || !teacherId) {
        return NextResponse.json({ message: "classId and teacherId are required" }, { status: 400 });
      }
  
      // Disconnect the teacher from the class
      await prisma.Classes.update({
        where: { id: classId },
        data: {
          teachers: {
            disconnect: { id: teacherId },
          },
        },
      });
  
      return NextResponse.json({ message: "Teacher removed successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error removing teacher from class:", error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }