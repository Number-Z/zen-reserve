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
import type { ReservationSchemaType } from "@/schemas/reservation";
import { useFormContext } from "react-hook-form";

export default function Customer() {
  const form = useFormContext<ReservationSchemaType>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>予約者情報</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <FormField
          control={form.control}
          name="customer.lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>姓</FormLabel>
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
          name="customer.firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>名</FormLabel>
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
          name="customer.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
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
          name="customer.phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>電話番号</FormLabel>
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
          name="customer.adultCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>大人</FormLabel>
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
          name="customer.childCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>子供</FormLabel>
              <FormControl>
                <Input {...field} />
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
