"use server";

import { createUrlSchema } from "@/app/schemas/urlSchema";

import { verifySession } from "@/_lib/session";

export async function createUrl(state: any, formData: FormData) {
  const validationResult = createUrlSchema.safeParse({
    origin_url: formData.get("origin_url"),
  });
  if (!validationResult.success) {
    return {
      error: validationResult.error.flatten().fieldErrors,
    };
  }
  try {
    const response = await fetch("http://localhost:4000/api/urls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validationResult.data),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to register");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return {
      error: {
        global: "An error occurred while creating url. Please try again.",
      },
    };
  }
}

export async function getClientUrls() {
  const { access_token } = await verifySession();
  try {
    const response = await fetch("http://localhost:4000/api/urls", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch urls");
    }

    const urls = await response.json();
    return urls;
  } catch (error) {
    console.error("Error fetching urls:", error);
    throw error;
  }
}