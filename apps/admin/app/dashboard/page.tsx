import CalendarView from "@/app/dashboard/calendar-view";
import getReservations from "@/services/getReservations";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const reservations = await getReservations();

  return <CalendarView reservations={reservations} />;
}
