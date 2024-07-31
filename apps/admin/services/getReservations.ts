"use server";

import prisma from "@zen-reserve/database";

export default async function getReservations(
  params: {
    take?: number;
    skip?: number;
  } = {},
) {
  const { take, skip } = params;
  const reservations = await prisma.reservation.findMany({
    orderBy: {
      reservationId: "desc",
    },
    include: {
      service: true,
    },
    take,
    skip,
  });
  return reservations;
}
