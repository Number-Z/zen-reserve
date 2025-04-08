import { z } from "zod";

export type IFormInput = {
  startDateTime?: Date;
  endDateTime?: Date;
  options: {
    tentSetup: boolean;
    firewood: boolean;
    saunaOil: boolean;
    bbqSet: boolean;
    additionalChairs: number;
    swimWears: number;
    bathTowels: number;
    crocses: number;
    saunaHats: number;
  };
  customer: {
    lastName: string;
    firstName: string;
    email: string;
    phoneNumber: string;
    adultCount: number;
    childCount?: number;
    otherInfo?: string;
  };
  discoveryMethods: string[];
  subTotalPrice?: number;
  totalPrice: number;
};

export const customerSchema = z.object({
  lastName: z.string().min(1, { message: "姓を入力してください" }),
  firstName: z.string().min(1, { message: "名を入力してください" }),
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください" }),
  phoneNumber: z
    .string()
    .min(1, { message: "電話番号を入力してください" })
    .regex(/^\d{10,11}$/, { message: "有効な電話番号を入力してください" }),
  adultCount: z.number().min(1, { message: "参加人数を選択してください" }),
  childCount: z.number().optional(),
  otherInfo: z.string().optional(),
});
