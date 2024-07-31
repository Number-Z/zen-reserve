import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { ReservationSchemaType } from "@/schemas/reservation";
import type { OptionsType } from "@/services/getOptionsServices";
import type { ReservationType } from "@/services/getReservationById";
import { useFormContext } from "react-hook-form";

type DetailsProps = {
  options: OptionsType;
};

export default function Options({ options }: DetailsProps) {
  const form = useFormContext<ReservationSchemaType>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>オプション一覧</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        {options.map((option) => (
          <FormField
            key={option.optionId}
            control={form.control}
            name={`options.${option.name}`}
            render={({ field }) => {
              switch (option.displayType) {
                case "toggle":
                  return (
                    <FormItem className="flex items-center gap-2 px-2 py-4">
                      <FormControl>
                        <Switch
                          checked={field.value as boolean}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="!mt-0">
                        <FormLabel>{option.printName}</FormLabel>
                        <FormDescription />
                      </div>
                    </FormItem>
                  );
                case "select":
                  return (
                    <FormItem>
                      <FormLabel>{option.printName}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value as number}
                          min={0}
                          onChange={(e) =>
                            field.onChange(Number.parseInt(e.target.value, 10))
                          }
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  );
                default:
                  return <></>;
              }
            }}
          />
        ))}
        <FormField
          control={form.control}
          name="customer.otherInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>その他ご要望</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
