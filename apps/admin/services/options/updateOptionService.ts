"use server";

import type { OptionServiceSchemaType } from "@/schemas/optionService";
import prisma from "@zen-reserve/database";
import { redirect } from "next/navigation";

export default async function updateOptionService(
  optionService: OptionServiceSchemaType,
) {
  await prisma.$transaction(async (tx) => {
    await tx.option.update({
      where: { optionId: optionService.optionId },
      data: {
        name: optionService.name,
        printName: optionService.printName,
        description: optionService.description,
        price: optionService.price,
        stock: optionService.stock === "" ? null : optionService.stock,
        limit: optionService.limit === "" ? null : optionService.limit,
        displayType: optionService.displayType,
        visible: optionService.visible,
      },
    });

    await tx.optionService.update({
      where: {
        serviceId_optionId: {
          serviceId: optionService.serviceId,
          // biome-ignore lint/style/noNonNullAssertion: Updateなので存在する
          optionId: optionService.optionId!,
        },
      },
      data: {
        order: optionService.order,
      },
    });
  });

  redirect("/dashboard/options");
}
