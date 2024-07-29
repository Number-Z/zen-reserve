import prisma from "@zen-reserve/database";
import { endOfDay, parseISO, startOfDay } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const dateString = req.nextUrl.searchParams.get("date");
  if (!dateString) {
    return new NextResponse("date is required", { status: 400 });
  }
  const date = parseISO(dateString);

  const serviceName = req.nextUrl.searchParams.get("serviceName");
  if (!serviceName) {
    return new NextResponse("serviceName is required", { status: 400 });
  }

  const reservations = await prisma.reservation.findMany({
    where: {
      startDateTime: {
        gte: startOfDay(date),
        lte: endOfDay(date),
      },
      service: {
        name: serviceName,
      },
    },
  });

  return NextResponse.json({ reservations: reservations.length.toString() });
}
