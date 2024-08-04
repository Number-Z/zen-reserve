"use server";

import type { UnavailableDateTimeSchemaType } from "@/schemas/unavailableDateTime";
import prisma from "@zen-reserve/database";
import { redirect } from "next/navigation";

export async function createUnavailableDateTime(
  unavailableDateTime: UnavailableDateTimeSchemaType,
) {
  await prisma.unavailableDateTime.create({
    data: {
      serviceId: unavailableDateTime.serviceId,
      startDateTime: unavailableDateTime.startDateTime,
      endDateTime: unavailableDateTime.endDateTime,
    },
  });

  redirect("/dashboard/unavailable-date-times");
}
