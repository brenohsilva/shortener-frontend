"use server";

import { createUrlSchema, updateUrlSchema } from "@/app/schemas/urlSchema";

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

export async function createUrlAuthenticated(state: any, formData: FormData) {
  const { access_token } = await verifySession();

  const tags = formData.getAll("tags").map((tag) => {
    return typeof tag === "string" ? { name: tag } : tag;
  });

  const validationResult = createUrlSchema.safeParse({
    origin_url: formData.get("origin_url"),
    short_code: formData.get("short_code"),
    comments: formData.get("comments"),
    tags: tags,
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
        Authorization: `Bearer ${access_token}`,
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

export async function updateUrl(urlId: number, state: any, formData: FormData) {
  const { access_token } = await verifySession();
  const tags = formData.getAll("tags").map((tag) => {
    return typeof tag === "string" ? { name: tag } : tag;
  });

  const validationResult = updateUrlSchema.safeParse({
    origin_url: formData.get("origin_url"),
    comments: formData.get("comments"),
    tags: tags,
  });

  if (!validationResult.success) {
    return {
      error: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`http://localhost:4000/api/urls/${urlId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validationResult.data),
    });

    if (!response.ok) {
      throw new Error("Failed to update url");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return {
      error: {
        global: "An error occurred while updating url. Please try again.",
      },
    };
  }
}

export async function deleteUrl(urlId: number) {
  const { access_token } = await verifySession();
  try {
    const response = await fetch(`http://localhost:4000/api/urls/${urlId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete url");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return {
      error: {
        global: "An error occurred while deleting url. Please try again.",
      },
    };
  }
}

export async function getClientUrls(tag?: string) {
  const { access_token } = await verifySession();

  try {
   
    const url = new URL("http://localhost:4000/api/urls");
    if (tag) {
      url.searchParams.append("tag", tag);
    }

    const response = await fetch(url.toString(), {
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

export async function getUrlClicks(groupBy: "hour" | "day", tag?: string) {
  const { access_token } = await verifySession();
  const params = new URLSearchParams();
  if (groupBy) params.append("groupBy", groupBy);
  if (tag) params.append("tag", tag);

  const url = `http://localhost:4000/api/urls/clicks?${params.toString()}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch clicks");
    }

    const clicks = await response.json();
    return clicks;
  } catch (error) {
    console.error("Error fetching clicks:", error);
    throw error;
  }
}

export async function getUserTags() {
  const { access_token } = await verifySession();
  try {
    const response = await fetch("http://localhost:4000/api/urls/tags", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tags");
    }

    const tags = await response.json();
    return tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
}
