import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RESERVATION_STATUS } from "@/consts/status";
import { getStatusString } from "@/lib/utils";
import type { ReservationSchemaType } from "@/schemas/reservation";
import type { InstructorsType } from "@/services/instructors/getInstructors";
import type { DiscoveryMethodsType } from "@/services/reservations/getDiscoveryMethods";
import type { OptionsServiceType } from "@/services/reservations/getOptionsService";
import { useCallback, useEffect, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

type DetailsProps = {
  basePrice: number;
  instructors: InstructorsType;
  discoveryMethods: DiscoveryMethodsType;
  optionsService: OptionsServiceType;
};

export default function Details({
  basePrice,
  instructors,
  discoveryMethods,
  optionsService,
}: DetailsProps) {
  const form = useFormContext<ReservationSchemaType>();

  const memoizedCalculateTotalPrice = useMemo(() => {
    return (
      selectedOptions: Record<string, string | number | boolean>,
      availableOptions: OptionsServiceType,
    ): number => {
      let totalPrice = basePrice;

      for (const [optionName, optionValue] of Object.entries(selectedOptions)) {
        const option = availableOptions.find((o) => o.name === optionName);
        if (option) {
          if (typeof optionValue === "boolean") {
            if (optionValue) {
              totalPrice += option.price;
            }
          } else if (typeof optionValue === "number") {
            if (optionValue > 0) {
              totalPrice += option.price * optionValue;
            }
          }
        }
      }

      return totalPrice;
    };
  }, [basePrice]);

  const watchedOptions = useWatch({
    control: form.control,
    name: "options",
  });

  const discount = useWatch({
    control: form.control,
    name: "discount",
  });

  const updateTotalPrice = useCallback(() => {
    const calculatedPrice = memoizedCalculateTotalPrice(
      watchedOptions,
      optionsService,
    );
    form.setValue("totalPrice", calculatedPrice);
  }, [memoizedCalculateTotalPrice, watchedOptions, optionsService, form]);

  useEffect(() => {
    updateTotalPrice();
  }, [updateTotalPrice]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>予約詳細</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <FormField
          control={form.control}
          name="startDateTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>開始日時</FormLabel>
              <FormControl>
                <DateTimePicker
                  displayFormat={{ hour24: "yyyy/MM/dd HH:mm" }}
                  granularity="minute"
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDateTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>終了日時</FormLabel>
              <FormControl>
                <DateTimePicker
                  displayFormat={{ hour24: "yyyy/MM/dd HH:mm" }}
                  granularity="minute"
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>予約ステータス</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(RESERVATION_STATUS).map((status) => (
                    <SelectItem key={status} value={status}>
                      {getStatusString(status)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructorId"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>インストラクター</FormLabel>
              </div>
              {instructors.map((instructor) => (
                <FormField
                  key={instructor.name}
                  control={form.control}
                  name="instructorId"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={instructor.name}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(
                              instructor.instructorId,
                            )}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...(field.value || []),
                                    instructor.instructorId,
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) =>
                                        value !== instructor.instructorId,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {instructor.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>割引額</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    updateTotalPrice();
                  }}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="totalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>金額</FormLabel>
              <FormControl>
                <Input disabled value={`${field.value - (discount || 0)}`} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discoveryMethods"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>予約経路</FormLabel>
              </div>
              {discoveryMethods.map((discoveryMethod) => (
                <FormField
                  key={discoveryMethod.name}
                  control={form.control}
                  name="discoveryMethods"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={discoveryMethod.name}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            disabled
                            checked={field.value?.includes(
                              discoveryMethod.name,
                            )}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...(field.value || []),
                                    discoveryMethod.name,
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== discoveryMethod.name,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {discoveryMethod.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
