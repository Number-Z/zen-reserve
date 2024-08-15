import { DateTimePicker } from "@/components/ui/datetime-picker";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UnavailableDateTimeSchemaType } from "@/schemas/unavailableDateTime";
import type { ServicesType } from "@/services/common/getServices";
import { useFormContext } from "react-hook-form";

type UnavailableDateTimeProps = {
  services: ServicesType;
};

export default function UnavailableDateTime({
  services,
}: UnavailableDateTimeProps) {
  const form = useFormContext<UnavailableDateTimeSchemaType>();

  return (
    <>
      <FormField
        control={form.control}
        name="serviceId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>サービス</FormLabel>
            <Select onValueChange={field.onChange} defaultValue="0">
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="0">全サービス</SelectItem>
                {services.map((service) => (
                  <SelectItem
                    key={service.serviceId}
                    value={service.serviceId.toString()}
                  >
                    {service.name}
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
    </>
  );
}
