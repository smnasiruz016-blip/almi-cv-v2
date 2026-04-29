"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { mayaRodriguez } from "@/lib/sample-cv-data";
import type { CVData } from "@/lib/cv-types";
import type { Prisma } from "@prisma/client";

export async function createResume(template: string = "classic-serif"): Promise<string> {
  const user = await requireUser();
  const resume = await prisma.resume.create({
    data: {
      userId: user.id,
      title: "Untitled CV",
      template,
      templateKey: template,
      data: mayaRodriguez as unknown as Prisma.InputJsonValue,
    },
  });
  revalidatePath("/dashboard");
  return resume.id;
}

export async function getResume(id: string) {
  const user = await requireUser();
  const resume = await prisma.resume.findFirst({
    where: { id, userId: user.id },
  });
  return resume;
}

export async function updateResume(
  id: string,
  updates: { title?: string; data?: CVData },
) {
  const user = await requireUser();
  const owned = await prisma.resume.findFirst({
    where: { id, userId: user.id },
    select: { id: true },
  });
  if (!owned) {
    throw new Error("Resume not found");
  }
  const resume = await prisma.resume.update({
    where: { id },
    data: {
      ...(updates.title !== undefined && { title: updates.title }),
      ...(updates.data !== undefined && {
        data: updates.data as unknown as Prisma.InputJsonValue,
      }),
    },
  });
  revalidatePath(`/cv/${id}/edit`);
  revalidatePath("/dashboard");
  return resume;
}

export async function listResumes() {
  const user = await requireUser();
  return await prisma.resume.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  });
}

export async function deleteResume(id: string) {
  const user = await requireUser();
  const owned = await prisma.resume.findFirst({
    where: { id, userId: user.id },
    select: { id: true },
  });
  if (!owned) {
    throw new Error("Resume not found");
  }
  await prisma.resume.delete({
    where: { id },
  });
  revalidatePath("/dashboard");
}
