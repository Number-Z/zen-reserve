import InstructorEditForm from "@/app/dashboard/instructors/[instructorId]/instructor-edit-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getInstructorById from "@/services/instructors/getInstructorById";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page({
  params,
}: { params: { instructorId: string } }) {
  const { instructorId } = params;
  if (!instructorId || Number.isNaN(Number(instructorId))) {
    redirect("/dashboard/instructors");
  }

  const instructor = await getInstructorById(Number(instructorId));
  if (!instructor) {
    redirect("/dashboard/instructors");
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>予約停止日時編集</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <InstructorEditForm instructor={instructor} />
        </CardContent>
      </Card>
    </div>
  );
}
