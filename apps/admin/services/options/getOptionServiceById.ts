"use server";

import type { Prisma } from "@prisma/client";
import prisma from "@zen-reserve/database";

type getOptionServiceByIdParams = {
  serviceId: number;
  optionId: number;
};

export default async function getOptionServiceById({
  serviceId,
  optionId,
}: getOptionServiceByIdParams) {
  const optionService = await prisma.optionService.findUnique({
    where: {
      serviceId_optionId: {
        serviceId,
        optionId,
      },
    },
    include: {
      Option: true,
      Service: true,
    },
  });
  return optionService;
}

export type OptionServiceType = Prisma.PromiseReturnType<
  typeof getOptionServiceById
>;
