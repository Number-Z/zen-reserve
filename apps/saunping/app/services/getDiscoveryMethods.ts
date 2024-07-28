"use server";

import prisma from "@zen-reserve/database";

export async function getDiscoveryMethods() {
  const discoveryMethods = await prisma.discoveryMethod.findMany();
  return discoveryMethods;
}
