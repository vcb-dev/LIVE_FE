import { z } from "zod"

import {
  DEFAULT_SLOT_SEC,
  SLOT_KINDS,
  type CreateLiveSessionPayload,
  type SlotKind,
} from "../types/live-session"

const slotRow = z
  .object({
    kind: z.enum(SLOT_KINDS),
    productId: z.string().optional().or(z.literal("")),
    groupId: z.string().optional().or(z.literal("")),
    plannedSec: z.coerce
      .number()
      .int("Thời lượng phải là số nguyên")
      .min(10, "Tối thiểu 10 giây"),
  })
  .superRefine((slot, ctx) => {
    if (slot.kind === "PRODUCT" && !slot.productId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Chọn sản phẩm",
        path: ["productId"],
      })
    }
    if (slot.kind === "PRODUCT" && slot.plannedSec < 30) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Sản phẩm tối thiểu 30 giây",
        path: ["plannedSec"],
      })
    }
  })

export const liveSessionFormSchema = z.object({
  name: z.string().trim().min(1, "Nhập tên phiên").max(200),
  slots: z.array(slotRow).min(1, "Thêm ít nhất 1 bước"),
})

export type LiveSessionFormInput = z.input<typeof liveSessionFormSchema>
export type LiveSessionFormValues = z.output<typeof liveSessionFormSchema>

export function emptySlot(kind: SlotKind): LiveSessionFormInput["slots"][number] {
  return {
    kind,
    productId: "",
    groupId: "",
    plannedSec: DEFAULT_SLOT_SEC[kind],
  }
}

export const liveSessionDefaultValues: LiveSessionFormInput = {
  name: "",
  slots: [emptySlot("OPENING"), emptySlot("PRODUCT"), emptySlot("CLOSING")],
}

export function mapLiveSessionFormToPayload(
  values: LiveSessionFormValues
): CreateLiveSessionPayload {
  return {
    name: values.name,
    slots: values.slots.map((slot) => ({
      kind: slot.kind,
      plannedSec: slot.plannedSec,
      ...(slot.kind === "PRODUCT" && slot.productId
        ? { productId: slot.productId }
        : {}),
      ...(slot.kind === "CTA" && slot.groupId ? { groupId: slot.groupId } : {}),
    })),
  }
}
