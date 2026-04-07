// @ts-nocheck
import { Resend } from "npm:resend@4.0.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

function normalizeCollaboratorCode(value) {
  return String(value || "").trim().toUpperCase();
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function validateCollaboratorCode(code) {
  if (!code) return "";

  const { data, error } = await supabaseAdmin
    .from("collaborators")
    .select("code, is_active")
    .eq("code", code)
    .maybeSingle();

  if (error) throw error;
  if (!data || !data.is_active) return "";

  return data.code;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();

    const tourId = String(body?.tourId || "").trim();
    const tourTitle = String(body?.tourTitle || "").trim();
    const tourSlug = String(body?.tourSlug || "").trim();
    const totalAmount = String(body?.totalAmount || "").trim();
    const customerName = String(body?.customerName || "").trim();
    const phone = String(body?.phone || "").trim();
    const email = String(body?.email || "").trim();
    const departureDate = String(body?.departureDate || "").trim();
    const guestCount = String(body?.guestCount || "").trim();
    const guestCountNumber = Number(body?.guestCountNumber || 0);
    const note = String(body?.note || "").trim();
    const collaboratorCodeRaw = normalizeCollaboratorCode(body?.collaboratorCode);

    if (!tourId || !tourTitle || !customerName || !phone) {
      return new Response(JSON.stringify({ error: "Thiếu thông tin bắt buộc" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const collaboratorCode = await validateCollaboratorCode(collaboratorCodeRaw);
    const referralSource = collaboratorCode ? "collaborator" : "direct";

    const { data: bookingRow, error: bookingError } = await supabaseAdmin
      .from("bookings")
      .insert({
        tour_id: tourId,
        tour_title: tourTitle,
        tour_slug: tourSlug || null,
        customer_name: customerName,
        phone,
        email: email || null,
        departure_date: departureDate || null,
        guest_count: guestCount || null,
        guest_count_number: Number.isFinite(guestCountNumber) ? guestCountNumber : 0,
        note: note || null,
        total_amount: totalAmount || null,
        collaborator_code: collaboratorCode || null,
        referral_source: referralSource,
        status: "new",
        payment_status: "pending",
      })
      .select()
      .single();

    if (bookingError) {
      return new Response(JSON.stringify({ error: bookingError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.7;color:#2d2d2d">
        <h2 style="margin-bottom:16px">Có khách mới đặt tour</h2>
        <p><strong>Mã booking:</strong> ${booking.booking_code || booking.id}</p>
        <p><strong>Tour:</strong> ${escapeHtml(tourTitle)}</p>
        <p><strong>Slug tour:</strong> ${escapeHtml(tourSlug || "--")}</p>
        <p><strong>Giá tour:</strong> ${escapeHtml(totalAmount || "Liên hệ")}</p>
        <p><strong>Họ tên:</strong> ${escapeHtml(customerName)}</p>
        <p><strong>Số điện thoại:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email || "Chưa có")}</p>
        <p><strong>Ngày khởi hành:</strong> ${escapeHtml(departureDate || "Chưa chọn")}</p>
        <p><strong>Số lượng khách:</strong> ${escapeHtml(guestCount || "Chưa chọn")}</p>
        <p><strong>Nội dung tư vấn:</strong> ${escapeHtml(note || "Không có")}</p>
        <hr style="margin:20px 0;border:none;border-top:1px solid #ddd" />
        <p><strong>Nguồn booking:</strong> ${escapeHtml(referralSource)}</p>
        <p><strong>Mã cộng tác viên:</strong> ${escapeHtml(collaboratorCode || "Không có")}</p>
      </div>
    `;

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "MVip Travel <onboarding@resend.dev>",
      to: ["kiennguyen2701@gmail.com"],
      subject: `Khách mới đặt tour: ${tourTitle}`,
      html,
    });

    if (emailError) {
      return new Response(JSON.stringify({ error: emailError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        booking: bookingRow,
        email: emailData,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});