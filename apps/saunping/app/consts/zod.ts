import { addHours } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { isMobilePhone } from "validator";
import * as z from "zod";

const minDate = addHours(toZonedTime(new Date(), "Asia/Tokyo"), 48);

export const schema = z.object({
  startDateTime: z
    .date({ message: "日時を選択してください" })
    .min(minDate, "その日時はもう予約できません"),
  endDateTime: z.date(),
  options: z.object({
    tentSetup: z.boolean(),
    firewood: z.boolean(),
    saunaOil: z.boolean(),
    bbqSet: z.boolean(),
    additionalChairs: z
      .number({
        required_error: "数値を入力してください",
      })
      .int("整数を入力してください")
      .nonnegative("0以上の数を選択してください")
      .max(12, "12以下の数を選択してください"),
    swimWears: z
      .number({
        required_error: "数値を入力してください",
      })
      .int("整数を入力してください")
      .nonnegative("0以上の数を選択してください")
      .max(12, "12以下の数を選択してください"),
    bathTowels: z
      .number({
        required_error: "数値を入力してください",
      })
      .int("整数を入力してください")
      .nonnegative("0以上の数を選択してください")
      .max(12, "12以下の数を選択してください"),
    crocses: z
      .number({
        required_error: "数値を入力してください",
      })
      .int("整数を入力してください")
      .nonnegative("0以上の数を選択してください")
      .max(12, "12以下の数を選択してください"),
    saunaHats: z
      .number({
        required_error: "数値を入力してください",
      })
      .int("整数を入力してください")
      .nonnegative("0以上の数を選択してください")
      .max(12, "12以下の数を選択してください"),
  }),
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
  discoveryMethods: z.array(z.string()),
  totalPrice: z.number().int().nonnegative().min(5000),
});
