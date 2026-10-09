import { z } from "zod"

import { toIsoDate } from "@/lib/date-vi"

const requiredNumber = (label: string, integer = false) =>
  z
    .string()
    .trim()
    .min(1, `Nhập ${label}`)
    .refine((value) => {
      const parsed = Number(value)
      if (!Number.isFinite(parsed) || parsed < 0) return false
      return integer ? Number.isInteger(parsed) : true
    }, integer ? `${label} phải là số nguyên >= 0` : `${label} phải là số >= 0`)

export const sessionReportFormSchema = z.object({
  liveDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Chọn ngày live"),
  staffName: z.string().trim().min(1, "Nhập tên nhân sự").max(100),
  shiftId: z.string().min(1, "Chọn ca live"),
  liveTypeId: z.string().min(1, "Chọn phân loại live"),
  teamId: z.string().min(1, "Chọn team"),
  channelId: z.string().min(1, "Chọn kênh live"),
  totalHours: requiredNumber("tổng giờ live"),
  revenue: requiredNumber("doanh thu"),
  viewCount: requiredNumber("số view", true),
  retentionRate: requiredNumber("tỷ lệ giữ chân").refine(
    (value) => Number(value) <= 100,
    "Tỷ lệ giữ chân tối đa 100"
  ),
  orderCount: requiredNumber("tổng đơn", true),
  impressionCount: requiredNumber("lượt hiển thị", true),
})

export type SessionReportFormInput = z.input<typeof sessionReportFormSchema>
export type SessionReportFormValues = z.output<typeof sessionReportFormSchema>

export const sessionReportDefaultValues: SessionReportFormInput = {
  liveDate: toIsoDate(new Date()),
  staffName: "",
  shiftId: "",
  liveTypeId: "",
  teamId: "",
  channelId: "",
  totalHours: "",
  revenue: "",
  viewCount: "",
  retentionRate: "",
  orderCount: "",
  impressionCount: "",
}
