"use server";

import type { Prisma } from "@prisma/client";
import prisma from "@zen-reserve/database";

export default async function getDiscoveryMethods() {
  const discoveryMethods = await prisma.discoveryMethod.findMany();

  return discoveryMethods;
}

export type DiscoveryMethodsType = Prisma.PromiseReturnType<
  typeof getDiscoveryMethods
>;
