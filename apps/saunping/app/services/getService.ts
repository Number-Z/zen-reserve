"use server";

import { SERVICE_NAME } from "@/app/consts/consts";
import prisma from "@zen-reserve/database";

export async function getService() {
  const service = await prisma.service.findFirst({
    where: {
      name: SERVICE_NAME,
    },
  });
  return service;
}
