// Import PrismaClient and bcrypt
import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

// Define the login route
export async function POST(req) {
  try {
    // Parse the request body
    const { email, password, role } = await req.json();

    // Convert email to lowercase
    const lowercaseEmail = email.toLowerCase();

    // Initialize the table name based on the role
    let tableName = "";
    let roleIs = "";

    // Determine the table name based on the role
    if (role === "admin") {
      tableName = "admins";
      roleIs = "admin";
    } else if (role === "teacher") {
      tableName = "Teachers";
      roleIs = "teacher";
    } else {
      // Invalid role
      return NextResponse.json({ error: "Invalid role" }, { status: 401 });
    }

    // Check if the user exists
    let user = await prisma[tableName].findUnique({
      where: {
        email: lowercaseEmail,
      },
    });

    // Special case for admin
    if (
      role === "admin" &&
      lowercaseEmail === "admin@gmail.com" &&
      password === "ronsard@123"
    ) {
      if (!user) {
        // Create the admin user with default values
        user = await prisma[tableName].create({
          data: {
            email: lowercaseEmail,
            password: password, // In a real application, make sure to hash the password
            name: "School Administrator",
          },
        });
      }
    }

    // Verify the user and password
    if (user && user.password === password) {
      // Create a JWT with the user's information
      const token = jwt.sign(
        { userId: user.id, email: user.email, fullName: user?.name ? user?.name : `${user.firstName} ${user.lastName}` },
        "your-secret-key", // Replace with a secure secret key (keep it secret)
        { expiresIn: "2h" } // Token expiration time (e.g., 2 hours)
      );

      cookies().set("access-token", token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Enable for HTTPS in production
      });

      let resetPasswordRequired = false

      if(password == "ronsard@123"){
        resetPasswordRequired = true
      }

      // Successful login
      return NextResponse.json(
        {
          token,
          message: "Login successful",
          roleIs,
          identity: user.id,
          user: user?.name ? user?.name : `${user.firstName} ${user.lastName}`,
          resetPasswordRequired
        },
        { status: 200 }
      );
    } else {
      // Invalid email or password
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    // Close the PrismaClient instance
    // await prisma.$disconnect();
  }
}
