"use server";

import { SERVICE_NAME } from "@/app/consts/consts";
import type { Prisma } from "@prisma/client";
import prisma from "@zen-reserve/database";

export async function getOptionsServices() {
  const optionsServices = await prisma.optionService.findMany({
    where: {
      Service: {
        name: SERVICE_NAME,
      },
    },
    include: {
      Option: true,
      Service: true,
    },
    orderBy: {
      order: "asc",
    },
  });
  return optionsServices;
}

export type OptionsServicesType = Prisma.PromiseReturnType<
  typeof getOptionsServices
>;
