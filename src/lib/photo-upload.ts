"use server";

import { put } from "@vercel/blob";
import { requireUser } from "@/lib/auth";

export async function uploadPhoto(
  formData: FormData,
): Promise<{ url: string } | { error: string }> {
  try {
    const user = await requireUser();
    const file = formData.get("photo") as File | null;

    if (!file) return { error: "No file provided" };

    if (!file.type.startsWith("image/")) {
      return { error: "Please upload an image file" };
    }
    if (file.size > 5 * 1024 * 1024) {
      return { error: "Image must be smaller than 5MB" };
    }

    const filename = `cv-photos/${user.id}/${Date.now()}-${file.name}`;
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
    });

    return { url: blob.url };
  } catch (err) {
    console.error("Photo upload failed", err);
    return { error: err instanceof Error ? err.message : "Upload failed" };
  }
}
