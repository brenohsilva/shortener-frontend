import { getClientUrls } from "@/server-actions/urlActions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const urls = await getClientUrls();
    return NextResponse.json(urls);
  } catch (error) {
    console.error("Erro ao buscar as urls:", error);
    return NextResponse.json(
      { error: "Erro ao buscar as urls" },
      { status: 500 }
    );
  }
}
