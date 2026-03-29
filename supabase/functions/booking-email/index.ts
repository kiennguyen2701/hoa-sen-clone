import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const body = await req.json();

    const {
      tourTitle,
      customerName,
      phone,
      departureDate,
      guestCount,
      note,
    } = body ?? {};

    if (!tourTitle || !customerName || !phone) {
      return new Response(
        JSON.stringify({ error: "Thiếu thông tin bắt buộc" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Hoa Sen Booking <onboarding@resend.dev>",
      to: ["kiennguyen2701@gmail.com"],
      subject: `Khách mới đặt tour: ${tourTitle}`,
      html: `
        <h2>Có khách mới đặt tour</h2>
        <p><strong>Tour:</strong> ${tourTitle}</p>
        <p><strong>Họ tên:</strong> ${customerName}</p>
        <p><strong>Số điện thoại:</strong> ${phone}</p>
        <p><strong>Ngày khởi hành:</strong> ${departureDate || "Chưa chọn"}</p>
        <p><strong>Số lượng khách:</strong> ${guestCount || "Chưa chọn"}</p>
        <p><strong>Nội dung tư vấn:</strong> ${note || "Không có"}</p>
      `,
    });

    if (error) {
      return new Response(JSON.stringify({ error }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});