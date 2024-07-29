import prisma from "@zen-reserve/database";
import { endOfDay, parseISO, startOfDay } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const dateString = req.nextUrl.searchParams.get("date");
  if (!dateString) {
    return new NextResponse("date is required", { status: 400 });
  }
  const date = parseISO(dateString);

  const options = await prisma.option.findMany({
    select: {
      optionId: true,
      name: true,
      optionReservations: {
        where: {
          reservation: {
            startDateTime: {
              gte: startOfDay(date),
              lte: endOfDay(date),
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
    count: option.optionReservations.reduce(
      (sum, reservation) => sum + reservation.quantity,
      0,
    ),
  }));

  return NextResponse.json({ options: optionsCount });
}
