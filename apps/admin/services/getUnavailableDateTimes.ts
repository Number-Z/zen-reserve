"use server";

import type { Prisma } from "@prisma/client";
import prisma from "@zen-reserve/database";

export async function getUnavailableDateTimes() {
  const unavailableDateTimes = await prisma.unavailableDateTime.findMany({
    include: {
      Service: true,
    },
  });
  return unavailableDateTimes;
}

export type UnavailableDateTimeType = Prisma.PromiseReturnType<
  typeof getUnavailableDateTimes
>;
