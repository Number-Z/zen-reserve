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
import type { DiscoveryMethodsType } from "@/services/getDiscoveryMethods";
import type { InstructorsType } from "@/services/getInstructors";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

type DetailsProps = {
  defaultTotalPrice: number;
  instructors: InstructorsType;
  discoveryMethods: DiscoveryMethodsType;
};

export default function Details({
  defaultTotalPrice,
  instructors,
  discoveryMethods,
}: DetailsProps) {
  const form = useFormContext<ReservationSchemaType>();

  const discount = useWatch({
    control: form.control,
    name: "discount",
  });
  useEffect(() => {
    form.setValue("totalPrice", defaultTotalPrice - discount);
  }, [defaultTotalPrice, discount, form.setValue]);

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
                <Input {...field} />
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
                <Input disabled {...field} />
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
