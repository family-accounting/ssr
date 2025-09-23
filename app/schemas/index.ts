import { z } from 'zod';


export const UserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  password: z.string().min(8),
  phone: z.string().min(10),
  confirmPassword: z.string().min(8),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
});

export const RegisterSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  phone: z.string().min(10),
  confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
});

export const LoginSchema = RegisterSchema.pick({ email: true, password: true });
// Schema برای users

// Schema برای groups
export const GroupSchema = z.object({
  id: z.uuid(),
  owner_id: z.uuid(),
  name: z.string().min(1, 'نام گروه نمی‌تواند خالی باشد'),
  description: z.string().optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
});

// Schema برای wallets
export const WalletSchema = z.object({
  id: z.uuid(),
  user_id: z.uuid(),
  name: z.string().min(1, 'نام کیف‌پول نمی‌تواند خالی باشد'),
  description: z.string().optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
  currency: z.enum(['USD', 'EUR', 'IRR']),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
});

// Schema برای categories
export const CategorySchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'نام دسته‌بندی نمی‌تواند خالی باشد'),
  description: z.string().optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
});

// Schema برای tags
export const TagSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'نام برچسب نمی‌تواند خالی باشد'),
  description: z.string().optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
});

// Schema برای invitations
export const InvitationSchema = z.object({
  id: z.uuid(),
  group_id: z.uuid(),
  email: z.email(),
  status: z.enum(['pending', 'accepted', 'rejected']),
  sent_at: z.iso.datetime({ offset: true }).optional(),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
});

// Schema برای user_group
export const UserGroupSchema = z.object({
  id: z.uuid(),
  user_id: z.uuid(),
  group_id: z.uuid(),
  role: z.enum(['admin', 'member']),
  created_at: z.iso.datetime({ offset: true }),
});

// Schema برای transaction_tag
export const TransactionTagSchema = z.object({
  transaction_id: z.uuid(),
  tag_id: z.uuid(),
  created_at: z.iso.datetime({ offset: true }),
});

// Schema برای transactions با اعتبارسنجی منطق انتقال‌ها
export const TransactionSchema = z.object({
  id: z.uuid(),
  amount: z.number().positive('مقدار باید مثبت باشد'),
  type: z.enum(['income', 'expense', 'transfer']),
  from_wallet_id: z.uuid().optional(),
  to_wallet_id: z.uuid().optional(),
  group_id: z.uuid().optional(),
  category_id: z.uuid().optional(),
  description: z.string().optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
}).refine(
  (data) => {
    if (data.type === 'income') {
      return data.to_wallet_id != null && data.from_wallet_id == null;
    }
    if (data.type === 'expense') {
      return data.from_wallet_id != null && data.to_wallet_id == null;
    }
    if (data.type === 'transfer') {
      return data.from_wallet_id != null && data.to_wallet_id != null;
    }
    return false;
  },
  {
    message:
      'برای واریز، to_wallet_id باید پر باشد؛ برای برداشت، from_wallet_id باید پر باشد؛ برای انتقال، هر دو باید پر باشند.',
    path: ['type'],
  },
);

// Schemaهای ورودی برای ایجاد/به‌روزرسانی (بدون id, created_at, updated_at)

export const UpdateUserSchema = UserSchema.omit({
  created_at: true,
  updated_at: true,
});
export const CreateUserSchema = UpdateUserSchema.omit({
  id: true,
});
export const UpdateGroupSchema = GroupSchema.omit({
  created_at: true,
  updated_at: true,
});
export const CreateGroupSchema = UpdateGroupSchema.omit({
  id: true,
});
export const UpdateWalletSchema = WalletSchema.omit({
  created_at: true,
  updated_at: true,
});
export const CreateWalletSchema = UpdateWalletSchema.omit({
  id: true,
});
export const UpdateCategorySchema = CategorySchema.omit({
  created_at: true,
  updated_at: true,
});
export const CreateCategorySchema = UpdateCategorySchema.omit({
  id: true,
});
export const UpdateTagSchema = TagSchema.omit({
  created_at: true,
  updated_at: true,
});
export const CreateTagSchema = UpdateTagSchema.omit({
  id: true,
});
export const UpdateInvitationSchema = InvitationSchema.omit({
  created_at: true,
  updated_at: true,
});
export const CreateInvitationSchema = UpdateInvitationSchema.omit({
  id: true,
});
export const UpdateUserGroupSchema = UserGroupSchema.omit({ created_at: true });
export const CreateUserGroupSchema = UpdateUserGroupSchema.omit({
  id: true,
});
export const UpdateTransactionSchema = TransactionSchema.omit({
  created_at: true,
  updated_at: true,
});
export const CreateTransactionSchema = TransactionSchema.omit({
  id: true, 
});
export const CreateTransactionTagSchema = TransactionTagSchema.omit({
  created_at: true,
});

// تایپ‌های TypeScript برای استفاده در Nuxt 3
export type IUser = z.infer<typeof UserSchema>;
export type IRegister = z.infer<typeof RegisterSchema>;
export type ILogin = z.infer<typeof LoginSchema>;
export type IGroup = z.infer<typeof GroupSchema>;
export type IWallet = z.infer<typeof WalletSchema>;
export type ICategory = z.infer<typeof CategorySchema>;
export type ITag = z.infer<typeof TagSchema>;
export type IInvitation = z.infer<typeof InvitationSchema>;
export type IUserGroup = z.infer<typeof UserGroupSchema>;
export type ITransaction = z.infer<typeof TransactionSchema>;
export type ITransactionTag = z.infer<typeof TransactionTagSchema>;

export type ICreateUser = z.infer<typeof CreateUserSchema>;
export type IUpdateUser = z.infer<typeof UpdateUserSchema>;
export type ICreateGroup = z.infer<typeof CreateGroupSchema>;
export type IUpdateGroup = z.infer<typeof UpdateGroupSchema>;
export type ICreateWallet = z.infer<typeof CreateWalletSchema>;
export type IUpdateWallet = z.infer<typeof UpdateWalletSchema>;
export type ICreateCategory = z.infer<typeof CreateCategorySchema>;
export type IUpdateCategory = z.infer<typeof UpdateCategorySchema>;
export type ICreateTag = z.infer<typeof CreateTagSchema>;
export type IUpdateTag = z.infer<typeof UpdateTagSchema>;
export type ICreateInvitation = z.infer<typeof CreateInvitationSchema>;
export type IUpdateInvitation = z.infer<typeof UpdateInvitationSchema>;
export type ICreateUserGroup = z.infer<typeof CreateUserGroupSchema>;
export type IUpdateUserGroup = z.infer<typeof UpdateUserGroupSchema>;
export type ICreateTransaction = z.infer<typeof CreateTransactionSchema>;
export type IUpdateTransaction = z.infer<typeof UpdateTransactionSchema>;
export type ICreateTransactionTag = z.infer<typeof CreateTransactionTagSchema>;
