"use server";

import type { Prisma } from "@prisma/client";
import prisma from "@zen-reserve/database";

export default async function getOptionsService(serviceId: number) {
  const optionsService = await prisma.optionService.findMany({
    where: {
      serviceId,
    },
    include: {
      Option: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  return optionsService.map((os) => os.Option);
}

export type OptionsServiceType = Prisma.PromiseReturnType<
  typeof getOptionsService
>;
