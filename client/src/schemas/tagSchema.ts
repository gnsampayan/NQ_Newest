import { z } from "zod";

export const tagSchema = z.object({
  tag: z.string().min(1),
});

export type TagType = z.infer<typeof tagSchema>;
