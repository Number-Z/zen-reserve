import UnavailableDateTimeEditForm from "@/app/dashboard/unavailable-date-times/[unavailableDateTimeId]/unavailable-date-time-edit-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getServices from "@/services/getServices";
import getUnavailableDateTimeById from "@/services/getUnavailableDateTimeById";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page({
  params,
}: { params: { unavailableDateTimeId: string } }) {
  const { unavailableDateTimeId } = params;
  if (!unavailableDateTimeId || Number.isNaN(Number(unavailableDateTimeId))) {
    redirect("/dashboard/unavailable-date-times");
  }

  const unavailableDateTime = await getUnavailableDateTimeById(
    Number(unavailableDateTimeId),
  );
  if (!unavailableDateTime) {
    redirect("/dashboard/unavailable-date-times");
  }

  const services = await getServices();

  return (
    <div className="flex h-full flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>予約停止日時編集</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <UnavailableDateTimeEditForm
            unavailableDateTime={unavailableDateTime}
            services={services}
          />
        </CardContent>
      </Card>
    </div>
  );
}
