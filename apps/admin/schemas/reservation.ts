import { RESERVATION_STATUS } from "@/consts/status";
import { isMobilePhone } from "validator";
import { z } from "zod";

const optionValueSchema = z.union([
  z.boolean({
    invalid_type_error: "選択してください",
    required_error: "選択してください",
  }),
  z
    .number({
      invalid_type_error: "数値を入力してください",
      required_error: "数値を入力してください",
    })
    .int("整数を入力してください")
    .nonnegative("正の整数を入力してください"),
  z.string(),
]);

export const reservationSchema = z.object({
  reservationId: z.number(),
  serviceId: z.number(),
  startDateTime: z.date({ message: "日時を選択してください" }),
  endDateTime: z.date(),
  options: z.record(optionValueSchema),
  customer: z.object({
    lastName: z.string().min(1, "苗字を入力してください"),
    firstName: z.string().min(1, "名前を入力してください"),
    email: z.string().email("正しいメールアドレスを入力してください"),
    phoneNumber: z.string().refine(isMobilePhone, {
      message: "正しい電話番号を入力してください",
    }),
    adultCount: z
      .number({
        required_error: "数値を入力してください",
      })
      .int("整数を入力してください")
      .positive("1人以上で予約してください"),
    childCount: z.number().int().nonnegative(),
    otherInfo: z.string().optional(),
  }),
  status: z.nativeEnum(RESERVATION_STATUS),
  instructorId: z.array(z.coerce.number()).optional(),
  discoveryMethods: z.array(z.string()).optional(),
  totalPrice: z.number().int().nonnegative(),
  discount: z.coerce
    .number({
      invalid_type_error: "数値を入力してください",
      required_error: "数値を入力してください",
    })
    .int("整数を入力してください"),
});

export type ReservationSchemaType = z.infer<typeof reservationSchema>;
