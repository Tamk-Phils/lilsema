import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createSupabaseAdmin } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ items: data ?? [] });
  } catch (error) {
    console.error("Gallery fetch failed:", error);
    return NextResponse.json({ error: "Failed to load gallery." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files").filter((f): f is File => f instanceof File);
    const category = String(formData.get("category") ?? "Photography");
    const eventName = String(formData.get("eventName") ?? "").trim() || null;

    if (files.length === 0) {
      return NextResponse.json({ error: "No files provided." }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();
    const uploaded: unknown[] = [];

    for (const file of files) {
      const fileExt = file.name.split(".").pop() ?? "jpg";
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);

      const { data, error: dbError } = await supabase
        .from("gallery")
        .insert([{ url: publicUrl, category, event_name: eventName }])
        .select()
        .single();

      if (dbError) throw dbError;
      uploaded.push(data);
    }

    // Bust the gallery and home page cache so new images appear immediately
    revalidatePath("/gallery");
    revalidatePath("/");

    return NextResponse.json({ success: true, uploaded });
  } catch (error) {
    console.error("Upload failed:", error);
    const message =
      error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const url = searchParams.get("url");

    if (!id || !url) {
      return NextResponse.json({ error: "Missing id or url." }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();
    const urlParts = url.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const filePath = `uploads/${fileName}`;

    await supabase.storage.from("images").remove([filePath]);

    const { error } = await supabase.from("gallery").delete().match({ id });

    if (error) throw error;

    // Bust the gallery and home page cache so deleted images disappear immediately
    revalidatePath("/gallery");
    revalidatePath("/");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete failed:", error);
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
