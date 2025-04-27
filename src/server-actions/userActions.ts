"use server";

import { loginSchema, registerSchema } from "@/app/schemas/usersSchema";

import { redirect } from "next/navigation";
import { createSession, verifySession } from "@/_lib/session";

export async function register(state: any, formData: FormData) {
  const validationResult = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationResult.success) {
    return {
      error: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch("http://localhost:4000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validationResult.data),
    });

    if (!response.ok) {
      throw new Error("Failed to register");
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      error: {
        global: "An error occurred while registering. Please try again.",
      },
    };
  }

  redirect("/auth/login");
}

export async function login(state: any, formData: FormData) {
  const validationResult = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationResult.success) {
    return {
      error: validationResult.error.flatten().fieldErrors,
    };
  }
  let token = "";
  try {
    const response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validationResult.data),
    });

    if (!response.ok) {
      throw new Error("Failed to register");
    }

    const data = await response.json();
    token = data.access_token;
  } catch (error) {
    console.error("Error:", error);
    return {
      error: {
        global: "Incorrect email or password",
      },
    };
  }

  await createSession(token);
}

export async function myProfile() {
  const { access_token } = await verifySession();
  try {
    const response = await fetch("http://localhost:4000/api/users/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    const profileData = await response.json();
    return profileData;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}
