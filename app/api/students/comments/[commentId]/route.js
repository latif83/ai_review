import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { toast } from "react-toastify";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";


export async function GET(req, { params }) {
  try {
    const { commentId } =  await params;


    // Fetch previous comments for the student
    const comment = await prisma.Comments.findUnique({
      where: { id: commentId }
    });

    // console.log(comment)

    return NextResponse.json(
      { comment },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching student and comments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function DELETE(req, { params }) {
    try {
      const { commentId } = await params;
  
      // Check if the comment exists
      const existingComment = await prisma.Comments.findUnique({
        where: { id: commentId },
      });
  
      if (!existingComment) {
        return NextResponse.json(
          { error: "Comment not found" },
          { status: 404 }
        );
      }
  
      // Delete the comment
      await prisma.Comments.delete({
        where: { id: commentId },
      });
  
      return NextResponse.json(
        { message: "Comment deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }