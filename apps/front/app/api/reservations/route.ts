import prisma from "@zen-reserve/database";
import { parseISO, set } from "date-fns";
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
        gte: set(date, {
          hours: 0,
          minutes: 0,
          seconds: 0,
        }),
        lte: set(date, {
          hours: 23,
          minutes: 59,
          seconds: 59,
        }),
      },
    },
  });
  return new NextResponse(reservations.length.toString());
}
