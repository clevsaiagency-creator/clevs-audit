import { NextResponse, type NextRequest } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  let body: { id?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (!body.id || typeof body.id !== "string") {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const supabase = getServiceClient();
    // Marcăm doar dacă opened_at e null (prima deschidere)
    const { error } = await supabase
      .from("audit_leads")
      .update({
        opened_at: new Date().toISOString(),
        status: "opened",
      })
      .eq("id", body.id)
      .is("opened_at", null);

    if (error) {
      console.error("Track open error:", error);
      return NextResponse.json({ error: "Failed to track" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Track open exception:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
