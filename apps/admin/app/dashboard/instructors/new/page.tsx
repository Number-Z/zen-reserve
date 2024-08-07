import InstructorCreateForm from "@/app/dashboard/instructors/new/instructor-create-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  return (
    <div className="flex h-full flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>インストラクター新規作成</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <InstructorCreateForm />
        </CardContent>
      </Card>
    </div>
  );
}
