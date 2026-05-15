import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase-admin";

const resend = new Resend(process.env.RESEND_API_KEY);

const TEAM_EMAILS = [
  "joaomouta@helarys.com",
  "josemario@helarys.com",
  "diogomagalhaes@helarys.com",
];

export async function POST(req: NextRequest) {
  const { name, email, business, type, message } = await req.json();

  if (!name || !email || !type || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error: dbError } = await supabaseAdmin.from("leads").insert({
    name,
    email,
    business: business || null,
    type,
    message,
  });

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 400 });

  try {
    await resend.emails.send({
      from: "Helarys Leads <noreply@helarys.com>",
      to: TEAM_EMAILS,
      subject: `Novo orçamento — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0b0f19;color:#fff;border-radius:16px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#0891b2,#1d4ed8);padding:32px 40px;">
            <p style="margin:0;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#a5f3fc;font-weight:600;">Helarys · Lead</p>
            <h1 style="margin:12px 0 0;font-size:26px;font-weight:800;letter-spacing:-0.5px;">Novo pedido de orçamento</h1>
          </div>
          <div style="padding:32px 40px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;color:#94a3b8;font-size:13px;width:120px;">Nome</td>
                <td style="padding:10px 0;font-size:14px;font-weight:600;">${name}</td>
              </tr>
              <tr style="border-top:1px solid #1e293b;">
                <td style="padding:10px 0;color:#94a3b8;font-size:13px;">Email</td>
                <td style="padding:10px 0;font-size:14px;"><a href="mailto:${email}" style="color:#22d3ee;text-decoration:none;">${email}</a></td>
              </tr>
              ${business ? `<tr style="border-top:1px solid #1e293b;"><td style="padding:10px 0;color:#94a3b8;font-size:13px;">Negócio</td><td style="padding:10px 0;font-size:14px;">${business}</td></tr>` : ""}
              <tr style="border-top:1px solid #1e293b;">
                <td style="padding:10px 0;color:#94a3b8;font-size:13px;">Tipo</td>
                <td style="padding:10px 0;font-size:14px;">${type}</td>
              </tr>
            </table>
            <div style="margin-top:24px;padding:20px;background:#0f172a;border-radius:12px;border:1px solid #1e293b;">
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#64748b;font-weight:600;">Mensagem</p>
              <p style="margin:0;font-size:14px;line-height:1.7;color:#cbd5e1;white-space:pre-wrap;">${message}</p>
            </div>
            <div style="margin-top:28px;">
              <a href="https://helarys.com/admin/leads" style="display:inline-block;background:#22d3ee;color:#000;padding:12px 24px;border-radius:50px;text-decoration:none;font-size:13px;font-weight:700;">Ver na admin area →</a>
            </div>
          </div>
        </div>
      `,
    });
  } catch (emailErr) {
    console.error("[contact email error]", emailErr);
  }

  return NextResponse.json({ success: true });
}
