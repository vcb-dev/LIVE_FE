import { z } from "zod"

const variantSchema = z.object({
  sku: z
    .string()
    .trim()
    .min(1, "SKU không được để trống")
    .max(100, "SKU tối đa 100 ký tự"),
  name: z
    .string()
    .trim()
    .max(100, "Tên biến thể tối đa 100 ký tự")
    .optional()
    .or(z.literal("")),
  price: z.coerce
    .number({ message: "Giá không hợp lệ" })
    .min(0, "Giá phải >= 0")
    .optional()
    .or(z.literal("")),
  stock: z.coerce
    .number()
    .int("Tồn kho phải là số nguyên")
    .min(0, "Tồn kho phải >= 0")
    .optional()
    .or(z.literal("")),
})

export const createProductSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Mã sản phẩm không được để trống")
    .max(100, "Mã sản phẩm tối đa 100 ký tự"),
  name: z
    .string()
    .trim()
    .min(1, "Tên sản phẩm không được để trống")
    .max(200, "Tên sản phẩm tối đa 200 ký tự"),
  description: z
    .string()
    .trim()
    .max(5000, "Mô tả tối đa 5000 ký tự")
    .optional()
    .or(z.literal("")),
  isActive: z.boolean(),
  variants: z.array(variantSchema).default([]),
})

export const updateProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tên sản phẩm không được để trống")
    .max(200, "Tên sản phẩm tối đa 200 ký tự"),
  description: z
    .string()
    .trim()
    .max(5000, "Mô tả tối đa 5000 ký tự")
    .optional()
    .or(z.literal("")),
  isActive: z.boolean(),
  variants: z.array(variantSchema).default([]),
})

export type CreateProductFormInput = z.input<typeof createProductSchema>
export type CreateProductFormValues = z.output<typeof createProductSchema>
export type UpdateProductFormInput = z.input<typeof updateProductSchema>
export type UpdateProductFormValues = z.output<typeof updateProductSchema>

export const createProductDefaultValues: CreateProductFormInput = {
  code: "",
  name: "",
  description: "",
  isActive: true,
  variants: [],
}

export const updateProductDefaultValues: UpdateProductFormInput = {
  name: "",
  description: "",
  isActive: true,
  variants: [],
}

export const PRODUCT_IMAGE_ACCEPT = "image/jpeg,image/png,image/webp,image/gif"
export const PRODUCT_IMAGE_MAX_BYTES = 10 * 1024 * 1024

export function validateProductImageFile(file: File): string | null {
  if (!PRODUCT_IMAGE_ACCEPT.split(",").includes(file.type)) {
    return "Ảnh phải là JPG, PNG, WEBP hoặc GIF"
  }
  if (file.size > PRODUCT_IMAGE_MAX_BYTES) {
    return "Ảnh không được lớn hơn 10MB"
  }
  return null
}

export function mapVariantFormToPayload(
  variants: CreateProductFormValues["variants"]
) {
  return variants.map((variant) => ({
    sku: variant.sku,
    name: variant.name?.trim() ? variant.name.trim() : undefined,
    price:
      variant.price === "" || variant.price === undefined
        ? undefined
        : Number(variant.price),
    stock:
      variant.stock === "" || variant.stock === undefined
        ? undefined
        : Number(variant.stock),
  }))
}

export function mapProductVariantsToForm(
  variants: Array<{
    sku: string
    name: string | null
    price: string | null
    stock: number
  }>
): CreateProductFormInput["variants"] {
  return variants.map((variant) => ({
    sku: variant.sku,
    name: variant.name ?? "",
    price: variant.price ? Number(variant.price) : "",
    stock: variant.stock,
  }))
}
