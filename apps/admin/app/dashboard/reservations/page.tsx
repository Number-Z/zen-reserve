import { columns } from "@/app/dashboard/reservations/columns";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RESERVATION_STATUS } from "@/consts/status";
import getReservations from "@/services/reservations/getReservations";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const reservations = await getReservations({
    statuses: [
      RESERVATION_STATUS.PENDING,
      RESERVATION_STATUS.CONFIRMED,
      RESERVATION_STATUS.CANCELED,
    ],
  });

  return (
    <div className="flex h-full flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>予約一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={reservations} />
        </CardContent>
      </Card>
    </div>
  );
}
