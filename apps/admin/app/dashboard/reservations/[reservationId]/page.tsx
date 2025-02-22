import ReservationEditForm from "@/app/dashboard/reservations/[reservationId]/reservation-edit-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getInstructors from "@/services/instructors/getInstructors";
import getDiscoveryMethods from "@/services/reservations/getDiscoveryMethods";
import getOptionsService from "@/services/reservations/getOptionsService";
import getReservationById from "@/services/reservations/getReservationById";
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
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const optionsService = await getOptionsService(reservation.serviceId!);

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
            optionsService={optionsService}
          />
        </CardContent>
      </Card>
    </div>
  );
}
