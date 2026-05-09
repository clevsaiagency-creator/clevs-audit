import { NextResponse, type NextRequest } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const leadId = request.nextUrl.searchParams.get("lead_id");
  if (!leadId) {
    return NextResponse.json({ error: "Lipsește lead_id" }, { status: 400 });
  }

  const claudeOutput = await request.text();
  if (!claudeOutput || claudeOutput.trim().length === 0) {
    return NextResponse.json({ error: "Body gol" }, { status: 400 });
  }

  let auditContent: unknown;
  try {
    const cleaned = claudeOutput.trim().replace(/^```json\s*|\s*```$/g, "");
    auditContent = JSON.parse(cleaned);
  } catch (e) {
    console.error("Claude output JSON parse failed:", e, claudeOutput);
    return NextResponse.json({ error: "Output Claude invalid" }, { status: 400 });
  }

  try {
    const supabase = getServiceClient();
    const { error } = await supabase
      .from("audit_leads")
      .update({
        audit_content: auditContent,
        status: "generated",
      })
      .eq("id", leadId);

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json({ error: "Update Supabase eșuat" }, { status: 500 });
    }
  } catch (e) {
    console.error("Supabase client error:", e);
    return NextResponse.json({ error: "Eroare server" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
