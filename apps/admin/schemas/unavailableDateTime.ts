import { z } from "zod";

export const unavailableDateTimeSchema = z.object({
  unavailableDateTimeId: z.coerce.number().optional(),
  serviceId: z.coerce.number().optional(),
  startDateTime: z.date({ message: "日時を選択してください" }),
  endDateTime: z.date({ message: "日時を選択してください" }),
});

export type UnavailableDateTimeSchemaType = z.infer<
  typeof unavailableDateTimeSchema
>;
