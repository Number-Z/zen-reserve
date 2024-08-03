import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import type { OptionsServicesType } from "@/services/getOptionsServices";
import { useFormContext } from "react-hook-form";

type DetailsProps = {
  optionsServices: OptionsServicesType;
};

export default function Options({ optionsServices }: DetailsProps) {
  const form = useFormContext<ReservationSchemaType>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>オプション一覧</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        {optionsServices.map((optionService) => (
          <FormField
            key={optionService.optionId}
            control={form.control}
            name={`options.${optionService.name}`}
            render={({ field }) => {
              switch (optionService.displayType) {
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
                        <FormLabel>{optionService.printName}</FormLabel>
                        <FormDescription />
                      </div>
                    </FormItem>
                  );
                case "select":
                  return (
                    <FormItem>
                      <FormLabel>{optionService.printName}</FormLabel>
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
