import { columns } from "@/app/dashboard/reservations/columns";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getReservations from "@/services/getReservations";

export default async function Page() {
  const reservations = await getReservations();

  return (
    <div className="flex h-full flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>予約一覧</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <DataTable columns={columns} data={reservations} />
        </CardContent>
      </Card>
    </div>
  );
}
