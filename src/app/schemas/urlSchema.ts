import { z } from "zod";

export const createUrlSchema = z.object({
  origin_url: z.string(),
  short_code: z.string().optional(),
  comments: z.string().optional(),
  tags: z.array(
    z.object({
      name: z.string()
    })
  ).optional()
});

export type CreateUrlFormData = z.infer<typeof createUrlSchema>;


export const updateUrlSchema = z.object({
  origin_url: z.string(),
  comments: z.string().optional(),
  tags: z.array(
    z.object({
      name: z.string()
    })
  ).optional()
})

export type UpdateUrlFormData = z.infer<typeof updateUrlSchema>;