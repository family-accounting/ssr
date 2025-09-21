import { z } from 'zod';


export const UserSchema = z.object({
  id: z.uuid(),
    email: z.email(),
  password: z.string().min(8, 'رمز عبور باید حداقل 8 کاراکتر باشد'),
    phone: z.string().min(10, 'شماره تلفن باید حداقل 10 رقم باشد'),
    confirmPassword: z.string().min(8, 'رمز عبور باید حداقل 8 کاراکتر باشد'),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
});

export const RegisterSchema = z.object({
  email: z.email(),
    password: z.string().min(8, 'رمز عبور باید حداقل 8 کاراکتر باشد'),
    phone: z.string().min(10, 'شماره تلفن باید حداقل 10 رقم باشد'),
    confirmPassword: z.string().min(8, 'رمز عبور باید حداقل 8 کاراکتر باشد'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'رمز عبور و تایید رمز عبور مطابقت ندارند',
  path: ['confirmPassword'],
});

export const LoginSchema = RegisterSchema.pick({ email: true, password: true , confirmPassword: true});
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
export const CreateUserSchema = UserSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});
export const CreateGroupSchema = GroupSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});
export const CreateWalletSchema = WalletSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});
export const CreateCategorySchema = CategorySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});
export const CreateTagSchema = TagSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});
export const CreateInvitationSchema = InvitationSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});
export const CreateUserGroupSchema = UserGroupSchema.omit({ created_at: true });
export const CreateTransactionSchema = TransactionSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
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
export type ICreateGroup = z.infer<typeof CreateGroupSchema>;
export type ICreateWallet = z.infer<typeof CreateWalletSchema>;
export type ICreateCategory = z.infer<typeof CreateCategorySchema>;
export type ICreateTag = z.infer<typeof CreateTagSchema>;
export type ICreateInvitation = z.infer<typeof CreateInvitationSchema>;
export type ICreateUserGroup = z.infer<typeof CreateUserGroupSchema>;
export type ICreateTransaction = z.infer<typeof CreateTransactionSchema>;
export type ICreateTransactionTag = z.infer<typeof CreateTransactionTagSchema>;