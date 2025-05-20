import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const academicYrs = await prisma.AcademicYear.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                _count: {
                    select: { terms: true }, // Directly count the terms
                },
            },
        });

        const academicYrsWithCount = academicYrs.map((year) => ({
            year : year.year,
            id: year.id,
            termCount: year._count.terms,
        }));

        // console.log({academicYrsWithCount})

        return NextResponse.json({ academicYrs: academicYrsWithCount }, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { message: "Internal Server Error!" },
            { status: 500 }
        );
    }
}

export async function POST(req) {
  try {
    const { year } = await req.json();

    if (!year) {
      return NextResponse.json(
        { message: "Missing required fields!" },
        { status: 400 }
      );
    }

    const newAcademicYear = await prisma.AcademicYear.create({
      data: {
        year,
      },
    });

    return NextResponse.json(
      { message: "Academic year added successfully!" },
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
