// Import PrismaClient and bcrypt
import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

// POST: Reset password route
export async function POST(req) {
    try {
      const { email, role, defaultPassword, newPassword } = await req.json();
  
      if (!email || !role || !defaultPassword || !newPassword) {
        return NextResponse.json(
          { message: "All fields are required" },
          { status: 400 }
        );
      }
  
      const lowercaseEmail = email.toLowerCase();
      let tableName = "";
  
      if (role === "admin") {
        tableName = "admins";
      } else if (role === "teacher") {
        tableName = "Teachers";
      } else {
        return NextResponse.json({ message: "Invalid role" }, { status: 400 });
      }
  
      // Check if the user exists
      const user = await prisma[tableName].findUnique({
        where: { email: lowercaseEmail },
      });
  
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
  
      // Check if the default password matches the one in the DB
      if (user.password !== defaultPassword) {
        return NextResponse.json(
          { message: "Default password is incorrect" },
          { status: 401 }
        );
      }
  
      // Update the user's password
      await prisma[tableName].update({
        where: { email: lowercaseEmail },
        data: { password: newPassword },
      });
  
      return NextResponse.json(
        { message: "Password has been reset successfully, please login with your new password!" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Reset password error:", error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }