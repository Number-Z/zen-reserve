import CalendarView from "@/app/dashboard/calendar-view";
import { RESERVATION_STATUS } from "@/consts/status";
import getReservations from "@/services/reservations/getReservations";
import { getUnavailableDateTimes } from "@/services/unavailableDateTime/getUnavailableDateTimes";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const reservations = await getReservations({
    statuses: [RESERVATION_STATUS.PENDING, RESERVATION_STATUS.CONFIRMED],
  });
  const unavailableDateTimes = await getUnavailableDateTimes();

  return (
    <CalendarView
      reservations={reservations}
      unavailableDateTimes={unavailableDateTimes}
    />
  );
}
