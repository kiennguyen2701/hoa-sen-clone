// @ts-nocheck
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

function normalizeCode(value) {
  return String(value || "").trim().toUpperCase();
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

    const code = normalizeCode(body?.code);
    const name = String(body?.name || "").trim();
    const phone = String(body?.phone || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const password = String(body?.password || "").trim();
    const commissionRate = Number(body?.commission_rate || 0);
    const notes = String(body?.notes || "").trim();

    if (!code || !name || !email || !password) {
      return new Response(JSON.stringify({ error: "Thiếu thông tin bắt buộc" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: existingCollab, error: existingCollabError } = await supabaseAdmin
      .from("collaborators")
      .select("id, code")
      .eq("code", code)
      .maybeSingle();

    if (existingCollabError) {
      return new Response(JSON.stringify({ error: existingCollabError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (existingCollab) {
      return new Response(JSON.stringify({ error: "Mã CTV đã tồn tại" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role: "collaborator",
        collaborator_code: code,
        collaborator_name: name,
      },
    });

    if (authError) {
      return new Response(JSON.stringify({ error: authError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = authUser?.user?.id;
    if (!userId) {
      return new Response(JSON.stringify({ error: "Không tạo được user auth" }), {
        status: 500,headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: collaborator, error: collaboratorError } = await supabaseAdmin
      .from("collaborators")
      .insert({
        code,
        name,
        phone: phone || null,
        email,
        commission_rate: commissionRate,
        notes: notes || null,
        is_active: true,
      })
      .select()
      .single();

    if (collaboratorError) {
      await supabaseAdmin.auth.admin.deleteUser(userId);
      return new Response(JSON.stringify({ error: collaboratorError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: mapping, error: mappingError } = await supabaseAdmin.rpc(
      "create_collaborator_user_mapping",
      {
        p_user_id: userId,
        p_collaborator_id: collaborator.id,
        p_email: email,
      }
    );

    if (mappingError) {
      await supabaseAdmin.from("collaborators").delete().eq("id", collaborator.id);
      await supabaseAdmin.auth.admin.deleteUser(userId);

      return new Response(JSON.stringify({ error: mappingError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        collaborator,
        auth_user_id: userId,
        mapping,
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