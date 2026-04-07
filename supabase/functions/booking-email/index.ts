// @ts-nocheck
import { Resend } from "npm:resend@4.0.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";

// Email nhận booking
const bookingReceiverEmail =
  Deno.env.get("BOOKING_RECEIVER_EMAIL") ||
  Deno.env.get("TO_EMAIL") ||
  "kiennguyen2701@gmail.com";

// Email gửi đi
const bookingFromEmail =
  Deno.env.get("BOOKING_FROM_EMAIL") ||
  Deno.env.get("FROM_EMAIL") ||
  "Mvip Travel <onboarding@resend.dev>";

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const resend = new Resend(resendApiKey);

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function normalizeText(value: unknown) {
  return String(value ?? "").trim();
}

function normalizeAmountText(value: unknown) {
  return String(value ?? "")
    .replace(/[^\d]/g, "")
    .trim();
}

function formatAmountDisplay(value: unknown) {
  const raw = normalizeAmountText(value);
  if (!raw) return "Liên hệ";
  return Number(raw).toLocaleString("vi-VN");
}

function inferSource(collaboratorCode: string) {
  return collaboratorCode ? "collaborator" : "website";
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return jsonResponse({ error: "Method Not Allowed" }, 405);
    }

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return jsonResponse(
        { error: "Thiếu SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY." },
        500,
      );
    }

    if (!resendApiKey) {
      return jsonResponse({ error: "Thiếu RESEND_API_KEY." }, 500);
    }

    const body = await req.json();

    const tourId = normalizeText(body?.tourId);
    const tourTitleFromBody = normalizeText(body?.tourTitle);
    const tourSlugFromBody = normalizeText(body?.tourSlug);
    const totalAmountFromBody = normalizeText(body?.totalAmount);

    const customerName = normalizeText(body?.customerName);
    const phone = normalizeText(body?.phone);
    const email = normalizeText(body?.email);
    const departureDate = normalizeText(body?.departureDate);
    const guestCount = normalizeText(body?.guestCount);
    const guestCountNumber = Number(body?.guestCountNumber || 0);
    const note = normalizeText(body?.note);
    const collaboratorCode = normalizeText(body?.collaboratorCode).toUpperCase();

    if (!tourId) {
      return jsonResponse({ error: "Thiếu tourId." }, 400);
    }

    if (!customerName || !phone) {
      return jsonResponse(
        { error: "Vui lòng nhập họ tên và số điện thoại." },
        400,
      );
    }

    // Lấy thông tin tour thật từ DB để đảm bảo đúng
    const { data: tourRow, error: tourError } = await supabase
      .from("tours")
      .select(`
        id,
        title,
        slug,
        price,
        commission_total,
        commission_ctv,
        commission_mvip
      `)
      .eq("id", tourId)
      .single();

    if (tourError || !tourRow) {
      console.error("tourError:", tourError);
      return jsonResponse({ error: "Không tìm thấy tour." }, 400);
    }

    let collaboratorName: string | null = null;

    if (collaboratorCode) {
      const { data: collaboratorRow, error: collaboratorError } = await supabase
        .from("collaborators")
        .select("code, name")
        .eq("code", collaboratorCode)
        .maybeSingle();

      if (collaboratorError) {
        console.error("collaboratorError:", collaboratorError);
      }

      collaboratorName = collaboratorRow?.name || null;
    }

    const source = inferSource(collaboratorCode);

    const insertPayload = {
      tour_id: tourRow.id,
      tour_title: tourRow.title || tourTitleFromBody || "",
      tour_slug: tourRow.slug || tourSlugFromBody || "",
      total_amount: normalizeAmountText(tourRow.price || totalAmountFromBody || "0"),
      customer_name: customerName,
      phone,
      email: email || null,
      departure_date: departureDate || null,
      guest_count: guestCount || null,
      guest_count_number: guestCountNumber || 0,
      note: note || null,
      notes: note || null,
      source,
      collaborator_code: collaboratorCode || null,
      collaborator_name: collaboratorName,
      payment_status: "pending",
      status: "new",
      commission_status: "unpaid",
      commission_amount: Number(tourRow.commission_ctv || 0),
    };

    const { data: insertedBooking, error: insertError } = await supabase
      .from("bookings")
      .insert(insertPayload)
      .select("id")
      .single();

    if (insertError || !insertedBooking) {
      console.error("insertError:", insertError);
      return jsonResponse(
        { error: insertError?.message || "Không tạo được booking." },
        500,
      );
    }

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select(`
        id,
        booking_code,
        tour_id,
        tour_title,
        tour_slug,
        total_amount,
        customer_name,
        phone,
        email,
        departure_date,
        guest_count,
        guest_count_number,
        note,
        notes,
        source,
        collaborator_code,
        collaborator_name,
        payment_status,
        status,
        commission_status,
        commission_amount,
        created_at
      `)
      .eq("id", insertedBooking.id)
      .single();

    if (bookingError || !booking) {
      console.error("bookingError:", bookingError);
      return jsonResponse(
        { error: bookingError?.message || "Không đọc được booking vừa tạo." },
        500,
      );
    }

    const bookingCode = booking.booking_code || booking.id;
    const tourTitle = booking.tour_title || tourTitleFromBody || "N/A";
    const tourSlug = booking.tour_slug || tourSlugFromBody || "N/A";
    const displayAmount = formatAmountDisplay(booking.total_amount);

    const collaboratorInfoHtml = collaboratorCode
      ? `
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
        <p><strong>Nguồn booking:</strong> collaborator</p>
        <p><strong>Mã CTV:</strong> ${escapeHtml(collaboratorCode)}</p>
        <p><strong>Tên CTV:</strong> ${escapeHtml(collaboratorName || "Chưa xác định")}</p>
        <p><strong>Hoa hồng CTV:</strong> ${Number(booking.commission_amount || 0).toLocaleString("vi-VN")}đ</p>
      `
      : `
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
        <p><strong>Nguồn booking:</strong> website</p>
      `;

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.7;color:#1f2937;">
        <h1 style="font-size:28px;margin:0 0 20px;">Có khách mới đặt tour</h1>

        <p><strong>Mã booking:</strong> ${escapeHtml(bookingCode)}</p>
        <p><strong>Tour:</strong> ${escapeHtml(tourTitle)}</p>
        <p><strong>Slug tour:</strong> ${escapeHtml(tourSlug)}</p>
        <p><strong>Giá tour:</strong> ${escapeHtml(displayAmount)}</p>

        <br />

        <p><strong>Họ tên:</strong> ${escapeHtml(booking.customer_name)}</p>
        <p><strong>Số điện thoại:</strong> ${escapeHtml(booking.phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(booking.email || "")}</p>
        <p><strong>Ngày khởi hành:</strong> ${escapeHtml(booking.departure_date || "")}</p>
        <p><strong>Số lượng khách:</strong> ${escapeHtml(booking.guest_count || "")}</p>
        <p><strong>Nội dung tư vấn:</strong> ${escapeHtml(booking.note || booking.notes || "")}</p>

        ${collaboratorInfoHtml}
      </div>
    `;

    const { error: sendMailError } = await resend.emails.send({
      from: bookingFromEmail,
      to: [bookingReceiverEmail],
      subject: `Khách mới đặt tour: ${tourTitle}`,
      html,
    });

    if (sendMailError) {
      console.error("sendMailError:", sendMailError);
      return jsonResponse(
        { error: sendMailError.message || "Gửi email thất bại." },
        500,
      );
    }

    return jsonResponse({
      success: true,
      booking: {
        id: booking.id,
        booking_code: bookingCode,
        source: booking.source,
        collaborator_code: booking.collaborator_code,
        collaborator_name: booking.collaborator_name,
        commission_amount: booking.commission_amount,
      },
    });
  } catch (err) {
    console.error("booking-email fatal error:", err);
    return jsonResponse(
      {
        error: err instanceof Error ? err.message : "Unknown error",
      },
      500,
    );
  }
});