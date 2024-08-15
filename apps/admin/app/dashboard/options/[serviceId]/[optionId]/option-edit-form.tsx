"use client";

import Option from "@/app/dashboard/options/[serviceId]/[optionId]/option";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import type { DISPLAY_TYPE } from "@/consts/displayType";
import {
  type OptionServiceSchemaType,
  optionServiceSchema,
} from "@/schemas/optionService";
import type { ServicesType } from "@/services/common/getServices";
import type { OptionServiceType } from "@/services/options/getOptionServiceById";
import updateOptionService from "@/services/options/updateOptionService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type OptionEditFormProps = {
  optionService: Exclude<OptionServiceType, null>;
  services: ServicesType;
};

export default function OptionEditForm({
  optionService,
  services,
}: OptionEditFormProps) {
  const router = useRouter();

  const form = useForm<OptionServiceSchemaType>({
    mode: "onChange",
    resolver: zodResolver(optionServiceSchema),
    defaultValues: {
      optionId: optionService.optionId,
      serviceId: optionService.serviceId,
      name: optionService.Option.name,
      printName: optionService.Option.printName,
      description: optionService.Option.description ?? "",
      price: optionService.Option.price,
      stock: optionService.Option.stock ?? "",
      limit: optionService.Option.limit ?? "",
      displayType: optionService.Option
        .displayType as keyof typeof DISPLAY_TYPE,
      order: optionService.order,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const handleSubmit = form.handleSubmit(async (data) => {
    await updateOptionService(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Option services={services} />
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
