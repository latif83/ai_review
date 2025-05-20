import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const academicYrs = await prisma.AcademicYear.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        terms: true,
      },
    });

    console.log({academicYrs})

    return NextResponse.json({ academicYrs }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
}
