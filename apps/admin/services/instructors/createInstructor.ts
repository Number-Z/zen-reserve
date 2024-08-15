"use server";

import type { InstructorSchemaType } from "@/schemas/instructor";
import prisma from "@zen-reserve/database";
import { redirect } from "next/navigation";

export async function createInstructor(instructor: InstructorSchemaType) {
  await prisma.instructor.create({
    data: {
      name: instructor.name,
      email: instructor.email,
    },
  });

  redirect("/dashboard/instructors");
}
