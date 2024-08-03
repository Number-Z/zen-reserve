import ReservationEditForm from "@/app/dashboard/reservations/[reservationId]/reservation-edit-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getDiscoveryMethods from "@/services/getDiscoveryMethods";
import getInstructors from "@/services/getInstructors";
import getOptionsServices from "@/services/getOptionsServices";
import getReservationById from "@/services/getReservationById";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page({
  params,
}: { params: { reservationId: string } }) {
  const { reservationId } = params;
  if (!reservationId || Number.isNaN(Number(reservationId))) {
    redirect("/dashboard/reservations");
  }

  const reservation = await getReservationById(Number(reservationId));
  if (!reservation) {
    redirect("/dashboard/reservations");
  }

  const instructors = await getInstructors();
  const discoveryMethods = await getDiscoveryMethods();
  const optionsServices = await getOptionsServices(reservation.serviceId);

  return (
    <div className="flex h-full flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>予約詳細</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <ReservationEditForm
            reservation={reservation}
            instructors={instructors}
            discoveryMethods={discoveryMethods}
            optionsServices={optionsServices}
          />
        </CardContent>
      </Card>
    </div>
  );
}
