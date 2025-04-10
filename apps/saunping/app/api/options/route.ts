import prisma from "@zen-reserve/database";
import { endOfDay, parseISO, startOfDay, subHours } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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

  const options = await prisma.option.findMany({
    where: {
      visible: true,
    },
    select: {
      optionId: true,
      name: true,
      OptionReservation: {
        where: {
          Reservation: {
            startDateTime: {
              gte: utcStartOfDay,
              lte: utcEndOfDay,
            },
          },
        },
        select: {
          quantity: true,
        },
      },
    },
    orderBy: {
      optionId: "asc",
    },
  });

  const optionsCount = options.map((option) => ({
    optionId: option.optionId,
    name: option.name,
    count: option.OptionReservation.reduce(
      (sum, reservation) => sum + reservation.quantity,
      0,
    ),
  }));

  return NextResponse.json({ options: optionsCount });
}
