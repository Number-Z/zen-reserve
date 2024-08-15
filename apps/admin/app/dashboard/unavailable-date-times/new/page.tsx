import UnavailableDateTimeCreateForm from "@/app/dashboard/unavailable-date-times/new/unavailable-date-time-create-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getServices from "@/services/common/getServices";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const services = await getServices();

  return (
    <div className="flex h-full flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>予約停止日時新規作成</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <UnavailableDateTimeCreateForm services={services} />
        </CardContent>
      </Card>
    </div>
  );
}
