import { z } from 'zod'

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
})
export const registerSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    phone: z.string().min(10)

}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword']
})
export const groupSchema = z.object({
    id: z.uuid(),
    title: z.string().min(3),
    description: z.string().min(3),
    owner_id: z.uuid()
})
export const createGroupSchema = groupSchema.omit({ id: true })
export const updateGroupSchema = groupSchema.partial().extend({ id: z.uuid() })