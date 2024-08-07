import { z } from "zod";

export const instructorSchema = z.object({
  instructorId: z.coerce.number().optional(),
  name: z.string({ message: "名前を入力してください" }),
  email: z
    .string({ message: "メールアドレスを入力してください" })
    .email("正しいメールアドレスを入力してください")
    .or(z.literal("")),
});

export type InstructorSchemaType = z.infer<typeof instructorSchema>;
