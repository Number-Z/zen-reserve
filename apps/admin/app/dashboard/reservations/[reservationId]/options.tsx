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
import type { OptionsServiceType } from "@/services/reservations/getOptionsService";
import { useFormContext } from "react-hook-form";

type DetailsProps = {
  optionsService: OptionsServiceType;
};

export default function Options({ optionsService }: DetailsProps) {
  const form = useFormContext<ReservationSchemaType>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>オプション一覧</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        {optionsService.map((optionService) => (
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
                        <FormLabel>
                          {optionService.printName}{" "}
                          <span className="text-gray-500 text-xs">
                            ({optionService.price.toLocaleString()}円)
                          </span>
                        </FormLabel>
                        <FormDescription />
                      </div>
                    </FormItem>
                  );
                case "select":
                  return (
                    <FormItem>
                      <FormLabel>
                        {optionService.printName}{" "}
                        <span className="text-gray-500 text-xs">
                          ({optionService.price.toLocaleString()}円)
                        </span>
                      </FormLabel>
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
