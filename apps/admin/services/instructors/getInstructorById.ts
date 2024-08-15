"use server";

import type { Prisma } from "@prisma/client";
import prisma from "@zen-reserve/database";

export default async function getInstructorById(instructorId: number) {
  const instructor = await prisma.instructor.findUnique({
    where: {
      instructorId,
    },
  });
  return instructor;
}

export type InstructorType = Prisma.PromiseReturnType<typeof getInstructorById>;
