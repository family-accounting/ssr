---
config:
  theme: mc
---
flowchart TD
  A[کاربر ایمیل و پسورد ثبت می‌کند] --> B[ایجاد رکورد در auth.users confirmed_at خالی]
  B --> C[ایمیل تایید ارسال می‌شود]
  C --> D[کاربر ایمیل را کلیک و تایید می‌کند confirmed_at مقداردهی می‌شود]
  D --> E{Trigger after update on auth.users}
  E -->|confirmed_at از null به مقدار تغییر کند| F[تابع create_profile ایجاد رکورد در profiles با user id]
  F --> G{پس از ایجاد profile}
  G --> H[گزینه 1: trigger بعد از insert روی profiles ایجاد گروه پیشفرض و کیف پول و نقش owner]
  G --> I[گزینه 2: edge function یا backend ایجاد defaults پس از مشاهده profile]
  H --> J[ایجاد گروه Personal با owner profile.id]
  J --> K[ایجاد کیف پول Main Wallet با currency پیشفرض]
  K --> L[ایجاد رکورد در user_group user و group و wallet]
  L --> M[ایجاد user_role با نقش owner برای کاربر]
  M --> N[اولین ورود کاربر]
  N --> O[کاربر ساخت گروه جدید یا پیوستن به گروه]
  O --> P[اگر ساخت گروه insert group جدید]
  O --> Q[اگر دعوت قبول شد اضافه شدن به user_group بدون wallet]
  Q --> R[کاربر انتخاب یا تنظیم wallet برای گروه update user_group]
  N --> S[کاربر ایجاد یا انتخاب کیف پول]
  S --> T[کاربر ثبت تراکنش]
  T --> U{نوع تراکنش}
  U -->|income| V[ایجاد تراکنش income]
  U -->|expense| W[ایجاد تراکنش expense]
  U -->|transfer| X[ایجاد تراکنش transfer با from و to wallet]
  V --> Y[Trigger تراکنش income افزایش موجودی wallet]
  W --> Z[Trigger تراکنش expense کاهش موجودی wallet]
  X --> AA[Trigger تراکنش transfer کاهش موجودی from و افزایش موجودی to]
  AA --> AB[ارسال رویداد realtime برای frontend]
  Y --> AB
  Z --> AB
  AB --> AC[Frontend نمایش موجودی و گزارش‌ها]
  AC --> AD[کاربر مدیریت نقش‌ها owner admin member بر اساس permissions]
