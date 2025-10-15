import { z } from "zod";
import lang from "@/lang/auth.json";
//! responce interface
export type ResponseType = { success: boolean; message: string };
//? forget password
export const formSchemaEmail = z.object({
  email: z.string().email({ message: lang.EmailError }),
});
export type FormValuesEmail = z.infer<typeof formSchemaEmail>;
//register
export const formSchema = z
  .object({
    email: z.string().email({ message: lang.EmailError }),
    password: z.string().min(6, { message: lang.PwdError }),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: lang.AcceptTerme,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: lang.ConfirmPwdError,
    path: ["confirmPassword"],
  });
export type FormValues = z.infer<typeof formSchema>;
///For Login
export const formSchemalogin = z.object({
  email: z.string().email({ message: lang.EmailError }),
  password: z.string().min(6, { message: lang.PwdError }),
  rememberMe: z.boolean().optional(),
});
export type FormValuesLogin = z.infer<typeof formSchemalogin>;
//For Update Pwd
export const formSchemaUpdate = z
  .object({
    password: z.string().min(6, { message: lang.PwdError }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: lang.ConfirmPwdError,
    path: ["confirmPassword"],
  });
export type FormValuesUpdate = z.infer<typeof formSchemaUpdate>;

//? Define Zod schema for Subcategory form validation
export const formSchemaSubCategories = z.object({
  title: z
    .string()
    .min(3, { message: "SUBCategory name must be at least 3 characters" }),
  seo_title: z
    .string()
    .min(3, { message: "SUBCategory name must be at least 3 characters" }),
  description: z.string().min(10, {
    message: "SUBCategory Description must be at least 10 characters",
  }),
  seo_description: z.string().min(10, {
    message: "SUBCategory Description must be at least 10 characters",
  }),
  featureImage: z
    .string()
    .default(
      "https://hgtbnpciilnospcatjoy.supabase.co/storage/v1/object/sign/gamestore/giftcard.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lc3RvcmUvZ2lmdGNhcmQucG5nIiwiaWF0IjoxNzQzODkwNDEwLCJleHAiOjIzNzQ2MTA0MTB9.2OJexjm3VoTAjM_ym_Uy5d6J_jaNS7-TBx8XufuPhWk",
    ),
  category_id: z.string().min(1, { message: "Please select a categories " }),
  handle: z.string(),
  ispublished: z.boolean().default(false),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color (e.g. #FF0000)",
  }),
});
export type FormValuesSubCategories = z.infer<typeof formSchemaSubCategories>;

//? Define Zod schema for category form validation
export const formSchemaCategories = z.object({
  title: z
    .string()
    .min(3, { message: "Category name must be at least 3 characters" })
    .toLowerCase(),
  ispublished: z.boolean().default(false),
  seo_title: z
    .string()
    .min(3, { message: "Category name must be at least 3 characters" })
    .toLowerCase(),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .toLowerCase(),
  seo_description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .toLowerCase(),
  handle: z.string().toLowerCase(),
});
export type FormValuesCategories = z.infer<typeof formSchemaCategories>;

export const productFormSchema = z.object({
  handle: z
    .string()
    .min(3, { message: "Handle must be at least 3 characters" })
    .regex(/^[a-z0-9-]+$/, {
      message:
        "Handle can only contain lowercase letters, numbers, and hyphens",
    }),
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().optional(),
  available_for_sale: z.boolean().default(true),
  featured_image_url: z.string(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  minprice: z.coerce.number().nonnegative(), // Extra field for UI
  maxprice: z.coerce.number().nonnegative(),
  isnew: z.boolean().default(false),
  isfeature: z.boolean().default(false),
  originalprice: z.coerce.number().nonnegative(),
  category: z.string().min(1, { message: "Please select a category" }), // Extra field for UI
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const galleryFormSchema = z.object({
  url: z.string().array().nonempty(),
  product_id: z.string(),
});

export type ImagesFormValue = z.infer<typeof galleryFormSchema>;

export const optionsFormSchema = z.object({
  name: z.string().nonempty(),
  value: z.string().array().nonempty(),
  product_id: z.string().nonempty(),
});

export type OtpionsFormValue = z.infer<typeof optionsFormSchema>;

export const varientFormSchema = z.object({
  title: z.string().nonempty(),
  available_for_sale: z.boolean().default(true),
  price: z.coerce.number().nonnegative(),
  product_id: z.string().nonempty(),
});

export type VarientFormValue = z.infer<typeof varientFormSchema>;
export const SelectorFormSchema = z.object({
  name: z.string().nonempty(),
  value: z.string().nonempty(),
  variant_id: z.string().nonempty(),
});
export type SelectortFormValue = z.infer<typeof SelectorFormSchema>;

export const FeaturesFormSchema = z.object({
  name: z.string().nonempty(),
  value: z.array(z.string()).nonempty(),
  product_id: z.string().nonempty(),
});
export type FeaturestFormValue = z.infer<typeof FeaturesFormSchema>;

export const SpecefictionFormSchema = z.object({
  name: z.string().nonempty(),
  value: z.string().nonempty(),
  product_id: z.string().nonempty(),
});

export type SpecefictionFormValue = z.infer<typeof SpecefictionFormSchema>;

export const ReviewFormSchema = z.object({
  rating: z.number().min(1),
  comment: z.string(),
  product_id: z.string().nonempty(),
});

export type ReviewFormValue = z.infer<typeof ReviewFormSchema>;


export const ProfileFormSchema = z.object({
  full_name:z.string().nonempty(),
  email:z.string().nonempty(),
  phone: z.string().nonempty().length(8,{message:"Please enter a valid phone number"}).regex(/^\d+$/, {
  message: "blh ekteb numero tlf sahih",
}),
  whatsapp: z.string().nonempty().length(8,{message:"Please enter a valid whatsapp number"}).regex(/^\d+$/, {
  message: "blh ekteb numero tlf sahih",
}),
});

export type ProfileFormValue = z.infer<typeof ProfileFormSchema>;
export const OrderFormSchema = z.object({
  fullname:z.string().nonempty(),
  email:z.string().nonempty(),
  phone:z.string().nonempty(),
  whatsapp:z.string().nonempty(),
  cart_id:z.string().nonempty()
});

export type OrderFormValue = z.infer<typeof OrderFormSchema>;
