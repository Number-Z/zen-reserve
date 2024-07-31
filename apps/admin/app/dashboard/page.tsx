import CalendarView from "@/app/dashboard/calendar-view";
import { RESERVATION_STATUS } from "@/consts/status";
import getReservations from "@/services/getReservations";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const reservations = await getReservations({
    statuses: [RESERVATION_STATUS.PENDING, RESERVATION_STATUS.CONFIRMED],
  });

  return <CalendarView reservations={reservations} />;
}
