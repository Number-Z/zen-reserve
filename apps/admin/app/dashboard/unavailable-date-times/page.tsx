import { columns } from "@/app/dashboard/unavailable-date-times/columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUnavailableDateTimes } from "@/services/unavailableDateTime/getUnavailableDateTimes";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const unavailableDateTimes = await getUnavailableDateTimes();

  return (
    <div className="flex h-full flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>予約停止日時一覧</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Button asChild className="self-end">
            <Link href="/dashboard/unavailable-date-times/new">追加</Link>
          </Button>
          <DataTable columns={columns} data={unavailableDateTimes} />
        </CardContent>
      </Card>
    </div>
  );
}
