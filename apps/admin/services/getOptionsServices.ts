"use server";

import type { Prisma } from "@prisma/client";
import prisma from "@zen-reserve/database";

export default async function getOptionsServices(serviceId: number) {
  const optionsServices = await prisma.optionService.findMany({
    where: {
      serviceId,
    },
    include: {
      option: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  return optionsServices.map((os) => os.option);
}

export type OptionsType = Prisma.PromiseReturnType<typeof getOptionsServices>;
