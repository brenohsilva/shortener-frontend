import { z } from "zod";

export const createUrlSchema = z.object({
  origin_url: z.string(),
});

export type CreateUrlFormData = z.infer<typeof createUrlSchema>;
