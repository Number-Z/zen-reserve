"use client";

import UnavailableDateTime from "@/app/dashboard/unavailable-date-times/new/unavailable-date-time";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  type UnavailableDateTimeSchemaType,
  unavailableDateTimeSchema,
} from "@/schemas/unavailableDateTime";
import type { ServicesType } from "@/services/common/getServices";
import { createUnavailableDateTime } from "@/services/unavailableDateTime/createUnavailableDateTime";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type UnavailableDateTimeCreateFormProps = {
  services: ServicesType;
};

export default function UnavailableDateTimeCreateForm({
  services,
}: UnavailableDateTimeCreateFormProps) {
  const router = useRouter();

  const form = useForm<UnavailableDateTimeSchemaType>({
    mode: "onChange",
    resolver: zodResolver(unavailableDateTimeSchema),
    defaultValues: {
      serviceId: undefined,
      startDateTime: undefined,
      endDateTime: undefined,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const handleSubmit = form.handleSubmit(async (data) => {
    await createUnavailableDateTime(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <UnavailableDateTime services={services} />
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
