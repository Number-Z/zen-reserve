"use client";

import Instructor from "@/app/dashboard/instructors/new/instructor";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  type InstructorSchemaType,
  instructorSchema,
} from "@/schemas/instructor";
import { createInstructor } from "@/services/instructors/createInstructor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function InstructorCreateForm() {
  const router = useRouter();

  const form = useForm<InstructorSchemaType>({
    mode: "onChange",
    resolver: zodResolver(instructorSchema),
    defaultValues: {
      name: undefined,
      email: undefined,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const handleSubmit = form.handleSubmit(async (data) => {
    await createInstructor(data);
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
                作成中...
              </>
            ) : (
              "作成"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
