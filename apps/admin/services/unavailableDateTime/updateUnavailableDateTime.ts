"use server";

import type { UnavailableDateTimeSchemaType } from "@/schemas/unavailableDateTime";
import prisma from "@zen-reserve/database";
import { redirect } from "next/navigation";

export async function updateUnavailableDateTime(
  unavailableDateTime: UnavailableDateTimeSchemaType,
) {
  await prisma.unavailableDateTime.update({
    where: {
      unavailableDateTimeId: unavailableDateTime.unavailableDateTimeId,
    },
    data: {
      serviceId:
        unavailableDateTime.serviceId === 0
          ? null
          : unavailableDateTime.serviceId,
      startDateTime: unavailableDateTime.startDateTime,
      endDateTime: unavailableDateTime.endDateTime,
    },
  });

  redirect("/dashboard/unavailable-date-times");
}
