import { RESERVATION_STATUS } from "@/app/consts/status";
import prisma from "@zen-reserve/database";
import { endOfDay, parseISO, startOfDay, subHours } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const serviceName = req.nextUrl.searchParams.get("serviceName");
  if (!serviceName) {
    return new NextResponse("serviceName is required", { status: 400 });
  }

  const dateString = req.nextUrl.searchParams.get("date");
  if (!dateString) {
    return new NextResponse("date is required", { status: 400 });
  }

  // UTC->JST
  const jstDate = toZonedTime(parseISO(dateString), "Asia/Tokyo");

  // JST基準で計算
  const jstStartOfDay = startOfDay(jstDate);
  const jstEndOfDay = endOfDay(jstDate);

  // JST->UTC
  const utcStartOfDay = subHours(jstStartOfDay, 9);
  const utcEndOfDay = subHours(jstEndOfDay, 9);

  const reservations = await prisma.reservation.findMany({
    select: {
      startDateTime: true,
    },
    where: {
      startDateTime: {
        gte: utcStartOfDay,
        lte: utcEndOfDay,
      },
      Service: {
        name: serviceName,
      },
      status: {
        not: RESERVATION_STATUS.CANCELED,
      },
    },
  });

  return NextResponse.json({ reservations });
}
