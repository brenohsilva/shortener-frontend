import { deleteUrl, getClientUrls } from "@/server-actions/urlActions";
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

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID da URL é obrigatório" },
        { status: 400 }
      );
    }

    const response = await deleteUrl(id);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Erro ao deletar URL:", error);
    return NextResponse.json({ error: "Erro ao deletar URL" }, { status: 500 });
  }
}
