"use client";

import Option from "@/app/dashboard/options/new/option";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  type OptionServiceSchemaType,
  optionServiceSchema,
} from "@/schemas/optionService";
import createOptionService from "@/services/createOptionService";
import type { ServicesType } from "@/services/getServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type OptionCreateFormProps = {
  services: ServicesType;
};
export default function OptionCreateForm({ services }: OptionCreateFormProps) {
  const router = useRouter();

  const form = useForm<OptionServiceSchemaType>({
    mode: "onChange",
    resolver: zodResolver(optionServiceSchema),
    defaultValues: {
      serviceId: undefined,
      name: undefined,
      printName: undefined,
      description: undefined,
      price: undefined,
      stock: "",
      limit: "",
      displayType: undefined,
      order: undefined,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const handleSubmit = form.handleSubmit(async (data) => {
    await createOptionService(data);
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
