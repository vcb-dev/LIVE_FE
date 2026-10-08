import { z } from "zod"

export const liveLookupFormSchema = z.object({
  name: z.string().trim().min(1, "Nhập tên").max(100, "Tên tối đa 100 ký tự"),
})

export type LiveLookupFormInput = z.input<typeof liveLookupFormSchema>
export type LiveLookupFormValues = z.output<typeof liveLookupFormSchema>

export const liveLookupDefaultValues: LiveLookupFormInput = {
  name: "",
}
