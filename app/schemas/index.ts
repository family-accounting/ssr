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


export const groupSchema = z.object({
    id: z.number().int().optional(),
    title: z.string().min(1),
    description: z.string().optional(),
    owner_id: z.uuid(),
    created_at: z.string().optional(),
});

export const createGroupSchema = groupSchema.omit({ id: true , created_at: true })
export const updateGroupSchema = groupSchema.partial().extend({ id: z.uuid() , created_at: true })

export const groupUserSchema = z.object({
    id: z.number().int().optional(),
    group_id: z.number().int(),
    user_id: z.uuid(),
    joined_at: z.string().optional(),
});


export const transactionLabelSchema = z.object({
    id: z.number().int().optional(),
    group_id: z.number().int(),
    type: z.enum(["category", "tag"]),
    label: z.string().min(1),
    value: z.string().min(1),
    created_at: z.string().optional(),
});


export const transactionSchema = z.object({
    id: z.number().int().optional(),
    group_id: z.number().int(),
    user_id: z.uuid(),
    amount: z.number(),
    type: z.enum(["income", "expense"]),
    description: z.string().optional(),
    category_id: z.number().int().optional(), 
    tag_ids: z.array(z.number().int()).optional(),
    created_at: z.string().optional(),
});

export const invitationSchema = z.object({
    id: z.number().int().optional(),
    group_id: z.number().int(),
    email: z.email(),
    invited_by: z.uuid(),
    invited_at: z.string().optional(),
    accepted: z.boolean().optional().default(false),
});



// ====================
// Groups
// ====================
export const GroupBase = z.object({
    title: z.string().min(1),
    description: z.string().nullable().optional(),
});

export const GroupCreate = GroupBase.extend({
    owner_id: z.uuid(),
});

export const GroupUpdate = GroupBase.partial();

export const Group = GroupBase.extend({
    id: z.uuid(),
    owner_id: z.uuid(),
    created_at: z.iso.datetime(),
    updated_at: z.iso.datetime(),
});

// ====================
// Group Users
// ====================
export const GroupUserBase = z.object({
    group_id: z.uuid(),
    user_id: z.uuid(),
});

export const GroupUser = GroupUserBase.extend({
    id: z.uuid(),
    joined_at: z.iso.datetime(),
});

// ====================
// Categories
// ====================
export const CategoryBase = z.object({
    group_id: z.uuid(),
    name: z.string().min(1),
});

export const CategoryCreate = CategoryBase;
export const CategoryUpdate = z.object({ name: z.string().min(1) }).partial();

export const Category = CategoryBase.extend({
    id: z.uuid(),
    created_at: z.iso.datetime(),
    updated_at: z.iso.datetime(),
});

// ====================
// Tags
// ====================
export const TagBase = z.object({
    group_id: z.uuid(),
    name: z.string().min(1),
});

export const TagCreate = TagBase;
export const TagUpdate = z.object({ name: z.string().min(1) }).partial();

export const Tag = TagBase.extend({
    id: z.uuid(),
    created_at: z.iso.datetime(),
    updated_at: z.iso.datetime(),
});

// ====================
// Transactions
// ====================
export const TransactionBase = z.object({
    group_id: z.uuid(),
    user_id: z.uuid(),
    amount: z.number(),
    type: z.enum(["income", "expense"]),
    description: z.string().nullable().optional(),
    category_id: z.uuid().nullable().optional(),
});

export const TransactionCreate = TransactionBase;
export const TransactionUpdate = TransactionBase.partial();

export const Transaction = TransactionBase.extend({
    id: z.uuid(),
    created_at: z.iso.datetime(),
    updated_at: z.iso.datetime(),
});

// ====================
// Transaction Tags (pivot table)
// ====================
export const TransactionTagBase = z.object({
    transaction_id: z.uuid(),
    tag_id: z.uuid(),
});

export const TransactionTag = TransactionTagBase;

// ====================
// Invitations
// ====================
export const InvitationBase = z.object({
    group_id: z.uuid(),
    email: z.email(),
    invited_by: z.uuid(),
});

export const InvitationCreate = InvitationBase;
export const InvitationUpdate = z.object({
    accepted: z.boolean(),
}).partial();

export const Invitation = InvitationBase.extend({
    id: z.uuid(),
    invited_at: z.iso.datetime(),
    accepted: z.boolean(),
});

