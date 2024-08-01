"use server";

import type { Prisma } from "@prisma/client";
import prisma from "@zen-reserve/database";

export default async function getInstructors() {
  const instructors = await prisma.instructor.findMany();

  return instructors;
}

export type InstructorsType = Prisma.PromiseReturnType<typeof getInstructors>;
