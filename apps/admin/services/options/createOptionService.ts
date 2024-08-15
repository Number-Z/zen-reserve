"use server";

import type { OptionServiceSchemaType } from "@/schemas/optionService";
import prisma from "@zen-reserve/database";
import { redirect } from "next/navigation";

export default async function createOptionService(
  optionService: OptionServiceSchemaType,
) {
  await prisma.$transaction(async (tx) => {
    const newOption = await tx.option.create({
      data: {
        name: optionService.name,
        printName: optionService.printName,
        description: optionService.description,
        price: optionService.price,
        stock: optionService.stock === "" ? null : optionService.stock,
        limit: optionService.limit === "" ? null : optionService.limit,
        displayType: optionService.displayType,
      },
    });

    await tx.optionService.create({
      data: {
        serviceId: optionService.serviceId,
        optionId: newOption.optionId,
        order: optionService.order,
      },
    });

    return newOption;
  });

  redirect("/dashboard/options");
}
