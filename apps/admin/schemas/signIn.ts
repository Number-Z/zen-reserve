import { z } from "zod";

export const signInSchema = z.object({
  email: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z
      .string({ required_error: "メールアドレスは必須です。" })
      .email("有効なメールアドレスを入力してください。"),
  ),
  password: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string({ required_error: "パスワードは必須です。" }).min(8, {
      message: "パスワードは8文字以上です。",
    }),
  ),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
