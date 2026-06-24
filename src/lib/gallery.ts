import { createClient } from "@supabase/supabase-js";
import type { GalleryImage } from "@/lib/seo";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("gallery")
    .select("id, url, category, event_name, created_at")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as GalleryImage[];
}
