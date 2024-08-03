"use server";

import { SERVICE_NAME } from "@/app/consts/consts";
import type { Prisma } from "@prisma/client";
import prisma from "@zen-reserve/database";
import { toZonedTime } from "date-fns-tz";

export async function getUnavailableDateTimes() {
  const now = toZonedTime(new Date(), "UTC");

  const serviceId = await prisma.service.findFirst({
    where: {
      name: SERVICE_NAME,
    },
  });
  if (!serviceId) {
    throw new Error("Service not found");
  }

  const unavailableDateTimes = await prisma.unavailableDateTime.findMany({
    where: {
      OR: [
        {
          serviceId: null,
        },
        {
          serviceId: serviceId.serviceId,
        },
      ],
      startDateTime: {
        gte: now,
      },
    },
  });
  return unavailableDateTimes;
}

export type UnavailableDateTimeType = Prisma.PromiseReturnType<
  typeof getUnavailableDateTimes
>;
