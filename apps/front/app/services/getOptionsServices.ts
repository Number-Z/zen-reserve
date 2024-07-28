"use server";

import prisma from "@zen-reserve/database";

type OptionServiceParams = {
  serviceName: string;
};

export async function getOptionsServices({ serviceName }: OptionServiceParams) {
  const optionsServices = await prisma.optionService.findMany({
    where: {
      service: {
        name: serviceName,
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
