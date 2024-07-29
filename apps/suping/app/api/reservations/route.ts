import prisma from "@zen-reserve/database";
import { endOfDay, parseISO, startOfDay } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const dateString = req.nextUrl.searchParams.get("date");
  if (!dateString) {
    return new NextResponse("Date is required", { status: 400 });
  }
  const date = parseISO(dateString);

  const reservations = await prisma.reservation.findMany({
    where: {
      startDateTime: {
        gte: startOfDay(date),
        lte: endOfDay(date),
      },
    },
  });

  return NextResponse.json({ reservations: reservations.length.toString() });
}
