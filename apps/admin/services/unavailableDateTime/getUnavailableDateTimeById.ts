"use server";

import type { Prisma } from "@prisma/client";
import prisma from "@zen-reserve/database";

export default async function getUnavailableDateTimeById(
  unavailableDateTimeId: number,
) {
  const unavailableDateTime = await prisma.unavailableDateTime.findUnique({
    where: {
      unavailableDateTimeId,
    },
  });
  return unavailableDateTime;
}

export type UnavailableDateTimeType = Prisma.PromiseReturnType<
  typeof getUnavailableDateTimeById
>;
