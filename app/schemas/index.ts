import { z } from 'zod'

export const userSchema = z.object({
    id: z.uuid(),
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    name: z.string().optional(),
    created_at: z.string().optional(),
    phone: z.string().min(10)
});

export const loginSchema = userSchema.pick({ email: true, password: true })
export const registerSchema = userSchema.pick({ email: true, password: true, phone: true ,confirmPassword: true}).extend({
    confirmPassword: z.string().min(8)
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword']
})

export type IUser = z.infer<typeof userSchema>
export type ILogin = z.infer<typeof loginSchema>
export type IRegister = z.infer<typeof registerSchema>

export const userData = {} as IUser
export const loginData = {} as ILogin
export const registerData = {} as IRegister



// ====================
// Groups
// ====================
export const groupSchema = z.object({
    id: z.uuid(),
    title: z.string().min(1),
    description: z.string(),
    owner_id: z.uuid(),
    created_at: z.string(),
    updated_at: z.string()
});
export const groupListSchema = groupSchema.array()
export const createGroupSchema = groupSchema.omit({ id: true , created_at: true, updated_at: true })
export const updateGroupSchema = groupSchema.omit({ created_at: true, updated_at: true, owner_id: true })

export type IGroup = z.infer<typeof groupSchema>
export type IGroupList = z.infer<typeof groupListSchema>
export type ICreateGroup = z.infer<typeof createGroupSchema>
export type IUpdateGroup = z.infer<typeof updateGroupSchema>

export const groupData = {} as IGroup
export const groupListData = [] as IGroupList
export const createGroupData = {} as ICreateGroup
export const updateGroupData = {} as IUpdateGroup

//currencies
export const currencySchema = z.object({
    id: z.uuid(),
    name: z.string().min(1),
    symbol: z.string().min(1),
    created_at: z.string(),
    updated_at: z.string()
});

//wallets
export const walletSchema = z.object({
    id: z.uuid(),
    group_id: z.uuid(),
    user_id: z.uuid(),
    name: z.string().min(1),
    description: z.string().optional(),
    currency_id: z.uuid(),
    balance: z.number().default(0),
    created_at: z.string(),
    updated_at: z.string()
});

// ====================
// Transactions
// ====================
export const transactionSchema = z.object({
    id: z.uuid(),
    group_id: z.uuid(),
    user_id: z.uuid(),
    amount: z.number().min(1),
    type: z.enum(["income", "expense"]),
    description: z.string().optional(),
    category_id: z.uuid().optional(), 
    tag_ids: z.array(z.uuid()).optional(),
    created_at: z.iso.datetime().optional(),
});
export const transactionListSchema = transactionSchema.array()
export const createTransactionSchema = transactionSchema
export const updateTransactionSchema = transactionSchema

export type ITransaction = z.infer<typeof transactionSchema>
export type ITransactionList = z.infer<typeof transactionListSchema>
export type ICreateTransaction = z.infer<typeof createTransactionSchema>
export type IUpdateTransaction = z.infer<typeof updateTransactionSchema>

export const transactionData = {} as ITransaction
export const transactionListData = [] as ITransactionList
export const createTransactionData = {} as ICreateTransaction
export const updateTransactionData = {} as IUpdateTransaction



// ====================
// Invitations
// ====================

export const invitationSchema = z.object({
    id: z.number().int().optional(),
    group_id: z.number().int(),
    email: z.email(),
    invited_by: z.uuid(),
    invited_at: z.string().optional(),
    accepted: z.boolean().optional().default(false),
});

export const invitationListSchema = invitationSchema.array()
export const createInvitationSchema = invitationSchema
export const updateInvitationSchema = invitationSchema

export type IInvitation = z.infer<typeof invitationSchema>
export type IInvitationList = z.infer<typeof invitationListSchema>
export type ICreateInvitation = z.infer<typeof createInvitationSchema>
export type IUpdateInvitation = z.infer<typeof updateInvitationSchema>

export const invitationData = {} as IInvitation
export const invitationListData = [] as IInvitationList
export const createInvitationData = {} as ICreateInvitation
export const updateInvitationData = {} as IUpdateInvitation




// ====================
// Tags
// ====================

export const tagSchema = z.object({
    id: z.uuid(),
    group_id: z.uuid(),
    name: z.string().min(1),
    created_at: z.string(),
    updated_at: z.string()
});
export const tagListSchema = tagSchema.array()
export const createTagSchema = tagSchema.pick({ name: true, group_id: true })
export const updateTagSchema = tagSchema
export type ITag = z.infer<typeof tagSchema>
export type ITagList = z.infer<typeof tagListSchema>
export type ICreateTag = z.infer<typeof createTagSchema>
export type IUpdateTag = z.infer<typeof updateTagSchema>

export const tagData = {} as ITag
export const tagListData = [] as ITagList
export const createTagData = {} as ICreateTag
export const updateTagData = {} as IUpdateTag



// ====================
// Categories
// ====================

export const categorySchema = z.object({
    id: z.uuid(),
    group_id: z.uuid(),
    name: z.string().min(1),
    created_at: z.string(),
    updated_at: z.string()
});
export const categoryListSchema = categorySchema.array()
export const createCategorySchema = categorySchema.pick({ name: true, group_id: true })
export const updateCategorySchema = categorySchema
export type ICategory = z.infer<typeof categorySchema>
export type ICategoryList = z.infer<typeof categoryListSchema>
export type ICreateCategory = z.infer<typeof createCategorySchema>
export type IUpdateCategory = z.infer<typeof updateCategorySchema>

export const categoryData = {} as ICategory
export const categoryListData = [] as ICategoryList
export const createCategoryData = {} as ICreateCategory
export const updateCategoryData = {} as IUpdateCategory





// export const groupUserSchema = z.object({
//     id: z.number().int().optional(),
//     group_id: z.number().int(),
//     user_id: z.uuid(),
//     joined_at: z.string().optional(),
// });


// export const transactionLabelSchema = z.object({
//     id: z.number().int().optional(),
//     group_id: z.number().int(),
//     type: z.enum(["category", "tag"]),
//     label: z.string().min(1),
//     value: z.string().min(1),
//     created_at: z.string().optional(),
// });







// ====================
// Groups
// ====================
// export const GroupBase = z.object({
//     title: z.string().min(1),
//     description: z.string().nullable().optional(),
// });

// export const GroupCreate = GroupBase.extend({
//     owner_id: z.uuid(),
// });

// export const GroupUpdate = GroupBase.partial();

// export const Group = GroupBase.extend({
//     id: z.uuid(),
//     owner_id: z.uuid(),
//     created_at: z.iso.datetime(),
//     updated_at: z.iso.datetime(),
// });

// ====================
// Group Users
// ====================
// export const GroupUserBase = z.object({
//     group_id: z.uuid(),
//     user_id: z.uuid(),
// });

// export const GroupUser = GroupUserBase.extend({
//     id: z.uuid(),
//     joined_at: z.iso.datetime(),
// });

// ====================
// Categories
// ====================
// export const CategoryBase = z.object({
//     group_id: z.uuid(),
//     name: z.string().min(1),
// });

// export const CategoryCreate = CategoryBase;
// export const CategoryUpdate = z.object({ name: z.string().min(1) }).partial();

// export const Category = CategoryBase.extend({
//     id: z.uuid(),
//     created_at: z.iso.datetime(),
//     updated_at: z.iso.datetime(),
// });

// ====================
// Tags
// ====================
// export const TagBase = z.object({
//     group_id: z.uuid(),
//     name: z.string().min(1),
// });

// export const TagCreate = TagBase;
// export const TagUpdate = z.object({ name: z.string().min(1) }).partial();

// export const Tag = TagBase.extend({
//     id: z.uuid(),
//     created_at: z.iso.datetime(),
//     updated_at: z.iso.datetime(),
// });

// ====================
// Transactions
// ====================
// export const TransactionBase = z.object({
//     group_id: z.uuid(),
//     user_id: z.uuid(),
//     amount: z.number(),
//     type: z.enum(["income", "expense"]),
//     description: z.string().nullable().optional(),
//     category_id: z.uuid().nullable().optional(),
// });

// export const TransactionCreate = TransactionBase;
// export const TransactionUpdate = TransactionBase.partial();

// export const Transaction = TransactionBase.extend({
//     id: z.uuid(),
//     created_at: z.iso.datetime(),
//     updated_at: z.iso.datetime(),
// });

// ====================
// Transaction Tags (pivot table)
// ====================
// export const TransactionTagBase = z.object({
//     transaction_id: z.uuid(),
//     tag_id: z.uuid(),
// });

// export const TransactionTag = TransactionTagBase;

// ====================
// Invitations
// ====================
// export const InvitationBase = z.object({
//     group_id: z.uuid(),
//     email: z.email(),
//     invited_by: z.uuid(),
// });

// export const InvitationCreate = InvitationBase;
// export const InvitationUpdate = z.object({
//     accepted: z.boolean(),
// }).partial();

// export const Invitation = InvitationBase.extend({
//     id: z.uuid(),
//     invited_at: z.iso.datetime(),
//     accepted: z.boolean(),
// });

