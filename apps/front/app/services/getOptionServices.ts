import prisma from "@zen-reserve/database";

type OptionServiceParams = {
  serviceName: string;
};

export async function getOptionServices({ serviceName }: OptionServiceParams) {
  const optionServices = await prisma.optionService.findMany({
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
  return optionServices;
}
