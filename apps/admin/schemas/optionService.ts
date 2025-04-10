import { DISPLAY_TYPE } from "@/consts/displayType";
import { z } from "zod";

export const optionServiceSchema = z.object({
  optionId: z.coerce.number().optional(),
  serviceId: z.coerce.number(),
  name: z
    .string()
    .regex(/^[a-zA-Z]+$/, {
      message: "オプション名はアルファベットのみで入力してください",
    })
    .min(1, { message: "オプション名を入力してください" }),
  printName: z.string({ message: "表示名を入力してください" }),
  description: z.string({ message: "説明を入力してください" }).optional(),
  price: z.coerce.number({ message: "金額を入力してください" }),
  stock: z
    .preprocess(
      (value) => (value === "" ? undefined : Number(value)),
      z.number({ message: "在庫を入力してください" }),
    )
    .or(z.literal("")),
  limit: z
    .preprocess(
      (value) => (value === "" ? undefined : Number(value)),
      z.number({ message: "上限を入力してください" }),
    )
    .or(z.literal("")),
  displayType: z.nativeEnum(DISPLAY_TYPE),
  order: z.coerce.number({ message: "表示順を入力してください" }),
  visible: z.boolean().default(true),
});

export type OptionServiceSchemaType = z.infer<typeof optionServiceSchema>;
