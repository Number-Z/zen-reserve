"use server";

import { SERVICE_NAME } from "@/app/consts/consts";
import prisma from "@zen-reserve/database";

export async function getOptionsServices() {
  const optionsServices = await prisma.optionService.findMany({
    where: {
      service: {
        name: SERVICE_NAME,
      },
    },
    include: {
      option: true,
      service: true,
    },
    orderBy: {
      order: "asc",
    },
  });
  return optionsServices;
}
