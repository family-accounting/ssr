import { z} from 'zod'
import { createGroupSchema, groupSchema, loginSchema, registerSchema, updateGroupSchema } from '~/schemas'
export type ILogin = z.output<typeof loginSchema>

export type IRegister = z.output<typeof registerSchema>

export type IGroup = z.output<typeof groupSchema>
export type ICreateGroup = z.output<typeof createGroupSchema>
export type IUpdateGroup = z.output<typeof updateGroupSchema>
