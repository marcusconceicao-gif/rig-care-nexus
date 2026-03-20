import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Check if user already exists
  const { data: users } = await supabaseAdmin.auth.admin.listUsers();
  const exists = users?.users?.some((u) => u.email === "tron@admin.com");

  if (exists) {
    return new Response(JSON.stringify({ message: "Master user already exists" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: "tron@admin.com",
    password: "Monfredini@2026",
    email_confirm: true,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ message: "Master user created", user: data.user?.id }), {
    headers: { "Content-Type": "application/json" },
  });
});
