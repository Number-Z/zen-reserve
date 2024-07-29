import prisma from "@zen-reserve/database";
import { endOfDay, parseISO, startOfDay } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const dateString = req.nextUrl.searchParams.get("date");
  if (!dateString) {
    return new NextResponse("date is required", { status: 400 });
  }
  const date = parseISO(dateString);

  const options = await prisma.optionReservation.groupBy({
    by: ["optionId"],
    where: {
      reservation: {
        startDateTime: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
      },
    },
    _sum: {
      quantity: true,
    },
  });
  const optionsCount = options.map((option) => ({
    optionId: option.optionId,
    count: option._sum.quantity || 0,
  }));

  return NextResponse.json({ options: optionsCount });
}
