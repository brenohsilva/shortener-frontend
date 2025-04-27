import { myProfile } from "@/server-actions/userActions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const profile = await myProfile();
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return NextResponse.json(
      { error: "Erro ao buscar perfil" },
      { status: 500 }
    );
  }
}
