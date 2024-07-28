"use server";

import prisma from "@zen-reserve/database";

export async function getService(serviceName: string) {
  const service = await prisma.service.findFirst({
    where: {
      name: serviceName,
    },
  });
  return service;
}
