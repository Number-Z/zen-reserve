"use server";

import type { RESERVATION_STATUS } from "@/consts/status";
import type { Prisma } from "@prisma/client";
import prisma from "@zen-reserve/database";

type GetReservationsParams = {
  statuses: (keyof typeof RESERVATION_STATUS)[];
};

export default async function getReservations({
  statuses,
}: GetReservationsParams) {
  const reservations = await prisma.reservation.findMany({
    orderBy: {
      reservationId: "desc",
    },
    where: {
      OR: statuses.map((status) => ({ status })),
    },
    include: {
      Instructor: true,
      Service: true,
    },
  });
  return reservations;
}

export type ReservationsType = Prisma.PromiseReturnType<typeof getReservations>;
