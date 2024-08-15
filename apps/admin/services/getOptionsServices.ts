"use server";

import type { Prisma } from "@prisma/client";
import prisma from "@zen-reserve/database";

export default async function getOptionsServices() {
  const optionsServices = await prisma.optionService.findMany({
    include: {
      Option: true,
      Service: true,
    },
    orderBy: [
      {
        serviceId: "asc",
      },
      {
        order: "asc",
      },
    ],
  });
  return optionsServices;
}

export type OptionsServicesType = Prisma.PromiseReturnType<
  typeof getOptionsServices
>;
