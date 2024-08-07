"use client";

import Instructor from "@/app/dashboard/instructors/[instructorId]/instructor";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  type InstructorSchemaType,
  instructorSchema,
} from "@/schemas/instructor";
import type { InstructorType } from "@/services/getInstructorById";
import { updateInstructor } from "@/services/updateInstructor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type InstructorEditFormProps = {
  instructor: Exclude<InstructorType, null>;
};

export default function InstructorEditForm({
  instructor,
}: InstructorEditFormProps) {
  const router = useRouter();

  const form = useForm<InstructorSchemaType>({
    mode: "onChange",
    resolver: zodResolver(instructorSchema),
    defaultValues: {
      instructorId: instructor.instructorId,
      name: instructor.name,
      email: instructor.email ?? "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const handleSubmit = form.handleSubmit(async (data) => {
    await updateInstructor(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Instructor />
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              router.back();
            }}
          >
            戻る
          </Button>
          <Button type="submit" disabled={isSubmitting || !isValid}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                更新中...
              </>
            ) : (
              "更新"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
