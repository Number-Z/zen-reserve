import OptionCreateForm from "@/app/dashboard/options/new/option-create-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getServices from "@/services/getServices";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const services = await getServices();

  return (
    <div className="flex h-full flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>オプション新規作成</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <OptionCreateForm services={services} />
        </CardContent>
      </Card>
    </div>
  );
}
