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
import { Textarea } from "@/components/ui/textarea";
import { DISPLAY_TYPE } from "@/consts/displayType";
import type { OptionServiceSchemaType } from "@/schemas/optionService";
import type { ServicesType } from "@/services/common/getServices";
import { useFormContext } from "react-hook-form";

type OptionProps = {
  services: ServicesType;
};

export default function Option({ services }: OptionProps) {
  const form = useFormContext<OptionServiceSchemaType>();

  return (
    <>
      <FormField
        control={form.control}
        name="serviceId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>サービス</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={form.getValues("serviceId")?.toString()}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
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
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>オプション名</FormLabel>
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
        name="printName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>表示名</FormLabel>
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
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>説明</FormLabel>
            <FormControl>
              <Textarea className="resize-none" {...field} />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>金額</FormLabel>
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
        name="stock"
        render={({ field }) => (
          <FormItem>
            <FormLabel>在庫</FormLabel>
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
        name="limit"
        render={({ field }) => (
          <FormItem>
            <FormLabel>上限</FormLabel>
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
        name="displayType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>表示タイプ</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={form.getValues("displayType")?.toString()}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(DISPLAY_TYPE).map((displayType) => (
                  <SelectItem key={displayType} value={displayType}>
                    {displayType}
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
        name="order"
        render={({ field }) => (
          <FormItem>
            <FormLabel>表示順</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
