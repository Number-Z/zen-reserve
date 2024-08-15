import { columns } from "@/app/dashboard/options/columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getOptionsServices from "@/services/getOptionsServices";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const optionsServices = await getOptionsServices();

  return (
    <div className="flex h-full flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>オプション一覧</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Button asChild className="self-end">
            <Link href="/dashboard/options/new">追加</Link>
          </Button>
          <DataTable columns={columns} data={optionsServices} />
        </CardContent>
      </Card>
    </div>
  );
}
