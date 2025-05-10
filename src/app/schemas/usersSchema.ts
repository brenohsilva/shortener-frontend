import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "O nome precisa ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const workspaceSchema = z.object({
  workspace: z.string().min(3, "O nome precisa ter pelo menos 3 caracteres"),
  slug: z.string().min(3, "O slug precisa ter pelo menos 3 caracteres"),
});
export type WorkspaceFormData = z.infer<typeof workspaceSchema>;