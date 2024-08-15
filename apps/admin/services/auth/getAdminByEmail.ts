"use server";

import prisma from "@zen-reserve/database";

export async function getAdminByEmail(email: string) {
  const admin = await prisma.admin.findUnique({
    where: { email },
  });
  return admin;
}
