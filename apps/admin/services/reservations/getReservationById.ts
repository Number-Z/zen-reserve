"use server";

import type { Prisma } from "@prisma/client";
import prisma from "@zen-reserve/database";

export default async function getReservationById(reservationId: number) {
  const reservation = await prisma.reservation.findUnique({
    where: {
      reservationId,
    },
    include: {
      DiscoveryMethodReservation: true,
      OptionReservation: {
        include: {
          Option: true,
        },
      },
      InstructorReservation: {
        include: {
          Instructor: true,
        },
      },
    },
  });
  return reservation;
}

export type ReservationType = Prisma.PromiseReturnType<
  typeof getReservationById
>;
