import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { toast } from "react-toastify";
// import { verifyToken } from "@/actions/action";

export const dynamic = "force-dynamic";

export async function PUT(req) {
    try {
        // Extract body params
        const { id,comment } = await req.json();
        // const { commentId } = params;
  
        if (!id || !comment) {
            return NextResponse.json(
                { message: "Please provide the required fields." },
                { status: 400 }
            );
        }
  
        const updateComment = await prisma.Comments.update({
            where: {
                id,
            },
            data: {
              comment,
            },
        });
  
        if (!updateComment) {
            return NextResponse.json(
                { message: "Error updating comment approval, please try again later." },
                { status: 400 }
            );
        }
  
        return NextResponse.json(
            { message: "Comment updated successfully!" },
            { status: 200 }
        );
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { message: "Internal Server Error!" },
            { status: 500 }
        );
    }
  }