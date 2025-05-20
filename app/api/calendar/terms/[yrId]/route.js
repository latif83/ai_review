import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { yrId } = params;

    if (!yrId) {
      return NextResponse.json(
        { message: "Missing required fields!" },
        { status: 400 }
      );
    }

    const terms = await prisma.AcademicTerm.findMany({
      where: {
        academicYearId: yrId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ terms }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}
