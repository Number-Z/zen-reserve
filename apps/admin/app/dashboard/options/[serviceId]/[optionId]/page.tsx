import OptionEditForm from "@/app/dashboard/options/[serviceId]/[optionId]/option-edit-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getServices from "@/services/common/getServices";
import getOptionServiceById from "@/services/options/getOptionServiceById";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page({
  params,
}: { params: { serviceId: string; optionId: string } }) {
  const { serviceId, optionId } = params;
  if (
    !serviceId ||
    !optionId ||
    Number.isNaN(Number(serviceId)) ||
    Number.isNaN(Number(optionId))
  ) {
    redirect("/dashboard/options");
  }

  const optionService = await getOptionServiceById({
    serviceId: Number(serviceId),
    optionId: Number(optionId),
  });
  if (!optionService) {
    redirect("/dashboard/options");
  }

  const services = await getServices();

  return (
    <div className="flex h-full flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>オプション編集</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <OptionEditForm optionService={optionService} services={services} />
        </CardContent>
      </Card>
    </div>
  );
}
