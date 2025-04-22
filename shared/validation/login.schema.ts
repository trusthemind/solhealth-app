import { z as zod } from 'zod'

export const loginSchema = zod.object({
  email: zod.string().email('Please enter a valid email'),
  password: zod.string().min(6, 'Password must be at least 6 characters').max(50, 'Password is too long'),
})
export type LoginFormData = zod.infer<typeof loginSchema>
