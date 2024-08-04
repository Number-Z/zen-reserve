"use server";

import type { Prisma } from "@prisma/client";
import prisma from "@zen-reserve/database";

export default async function getServices() {
  const services = await prisma.service.findMany({
    orderBy: {
      serviceId: "asc",
    },
  });

  return services;
}

export type ServicesType = Prisma.PromiseReturnType<typeof getServices>;
