import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

import { FormInput } from "@/components/FieldCustom/FormInput"
import { FormDialog } from "@/components/UiCustom/FormDialog"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { MODAL_MODE, type ModalModeType } from "@/constants/common"

import {
  liveLookupDefaultValues,
  liveLookupFormSchema,
  type LiveLookupFormInput,
  type LiveLookupFormValues,
} from "../schemas/live-lookup-form.schema"

interface LiveLookupFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: ModalModeType
  name?: string
  title: string
  loading?: boolean
  onSubmit: (values: LiveLookupFormValues) => void
}

export function LiveLookupFormDialog({
  open,
  onOpenChange,
  mode,
  name,
  title,
  loading,
  onSubmit,
}: LiveLookupFormDialogProps) {
  const form = useForm<LiveLookupFormInput, unknown, LiveLookupFormValues>({
    resolver: zodResolver(liveLookupFormSchema),
    defaultValues: liveLookupDefaultValues,
  })

  useEffect(() => {
    if (!open) return
    form.reset(
      mode === MODAL_MODE.EDIT && name
        ? { name }
        : liveLookupDefaultValues
    )
  }, [open, mode, name, form])

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Hủy
          </Button>
          <Button type="submit" form="live-lookup-form" disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </>
      }
    >
      <Form {...form}>
        <form
          id="live-lookup-form"
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            control={form.control}
            name="name"
            label="Tên"
            placeholder="Nhập tên"
            required
          />
        </form>
      </Form>
    </FormDialog>
  )
}
