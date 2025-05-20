import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { term, academicYearId } = await req.json();

    if (!term) {
      return NextResponse.json(
        { message: "Missing required fields!" },
        { status: 400 }
      );
    }

    const newAcademicTerm = await prisma.AcademicTerm.create({
      data: {
        term,
        academicYearId,
      },
    });

    return NextResponse.json(
      { message: "Academic term added successfully!" },
      { status: 201 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
}
