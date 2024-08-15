"use client";

import UnavailableDateTime from "@/app/dashboard/unavailable-date-times/[unavailableDateTimeId]/unavailable-date-time";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  type UnavailableDateTimeSchemaType,
  unavailableDateTimeSchema,
} from "@/schemas/unavailableDateTime";
import type { ServicesType } from "@/services/common/getServices";
import type { UnavailableDateTimeType } from "@/services/unavailableDateTime/getUnavailableDateTimeById";
import { updateUnavailableDateTime } from "@/services/unavailableDateTime/updateUnavailableDateTime";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type UnavailableDateTimeEditFormProps = {
  unavailableDateTime: Exclude<UnavailableDateTimeType, null>;
  services: ServicesType;
};

export default function UnavailableDateTimeEditForm({
  unavailableDateTime,
  services,
}: UnavailableDateTimeEditFormProps) {
  const router = useRouter();

  const form = useForm<UnavailableDateTimeSchemaType>({
    mode: "onChange",
    resolver: zodResolver(unavailableDateTimeSchema),
    defaultValues: {
      unavailableDateTimeId: unavailableDateTime.unavailableDateTimeId,
      serviceId: unavailableDateTime.serviceId ?? undefined,
      startDateTime: unavailableDateTime.startDateTime,
      endDateTime: unavailableDateTime.endDateTime,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const handleSubmit = form.handleSubmit(async (data) => {
    await updateUnavailableDateTime(data);
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
