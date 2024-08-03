"use server";

import type { Prisma } from "@prisma/client";
import prisma from "@zen-reserve/database";

export default async function getOptionsServices(serviceId: number) {
  const optionsServices = await prisma.optionService.findMany({
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

  return optionsServices.map((os) => os.Option);
}

export type OptionsServicesType = Prisma.PromiseReturnType<
  typeof getOptionsServices
>;
