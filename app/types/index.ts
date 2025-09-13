import { z} from 'zod'
import { createGroupSchema, groupSchema, loginSchema, registerSchema, transactionSchema, updateGroupSchema, userSchema } from '~/schemas'
export type ILogin = z.output<typeof loginSchema>

export type IRegister = z.output<typeof registerSchema>

export type IGroup = z.output<typeof groupSchema>
export type ICreateGroup = z.output<typeof createGroupSchema>
export type IUpdateGroup = z.output<typeof updateGroupSchema>
export type IUser = z.output<typeof userSchema>

export type ITransaction = z.output<typeof transactionSchema>