import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { subjectId, name } = await req.json();
    if (!subjectId || !name) {
      return NextResponse.json(
        { message: "Please fill in the required fields!" },
        { status: 400 }
      );
    }

    await prisma.subjects.create({
      data: {
        subjectId,
        name,
      },
    });

    return NextResponse.json(
      { message: "New subject created successfully!" },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, subjectId, name } = await req.json();

    // Basic validation
    if (!id || !subjectId || !name) {
      return NextResponse.json(
        { message: "Please fill in the required fields!" },
        { status: 400 }
      );
    }

    // Ensure subject exists before updating (optional but safe)
    const existingSubject = await prisma.subjects.findUnique({
      where: { id },
    });

    if (!existingSubject) {
      return NextResponse.json(
        { message: "Subject not found!" },
        { status: 404 }
      );
    }

    // Update subject
    await prisma.subjects.update({
      where: { id },
      data: {
        subjectId,
        name,
      },
    });

    return NextResponse.json(
      { message: "Subject edited successfully!" },
      { status: 200 }
    );
  } catch (e) {
    console.error("PUT /api/subjects error:", e);
    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subjects = await prisma.subjects.findMany();
    return NextResponse.json({ subjects }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    // Validate input
    if (!id) {
      return NextResponse.json(
        { message: "Subject ID is required!" },
        { status: 400 }
      );
    }

    // Check if subject exists
    const subject = await prisma.subjects.findUnique({
      where: { id },
    });

    // check if subject has related comments
    const comments = await prisma.comments.findFirst({
      where: { subjectId: id },
    });

    if (comments) {
      return NextResponse.json(
        { message: "Subject has related comments and cannot be deleted!" },
        { status: 400 }
      );
    }

    if (!subject) {
      return NextResponse.json(
        { message: "Subject not found!" },
        { status: 404 }
      );
    }

    // Delete the subject
    await prisma.subjects.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Subject deleted successfully!" },
      { status: 200 }
    );
  } catch (e) {
    console.error("DELETE /api/subjects error:", e);
    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}
