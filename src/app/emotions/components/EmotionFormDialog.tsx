import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { FormInput } from "@/components/FieldCustom/FormInput"
import { FormDialog } from "@/components/UiCustom/FormDialog"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { MODAL_MODE, type ModalModeType } from "@/constants/common"

import {
  createEmotionDefaultValues,
  createEmotionSchema,
  updateEmotionDefaultValues,
  updateEmotionSchema,
  type CreateEmotionFormInput,
  type CreateEmotionFormValues,
  type UpdateEmotionFormInput,
  type UpdateEmotionFormValues,
} from "../schemas/emotion-form.schema"
import type { Emotion } from "../types/emotion"
import { EmotionImageUpload } from "./EmotionImageUpload"

interface EmotionFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: ModalModeType
  emotion?: Emotion | null
  loading?: boolean
  onCreate: (values: CreateEmotionFormValues, imageFile: File | null) => void
  onUpdate: (values: UpdateEmotionFormValues, imageFile: File | null) => void
}

export function EmotionFormDialog({
  open,
  onOpenChange,
  mode,
  emotion,
  loading,
  onCreate,
  onUpdate,
}: EmotionFormDialogProps) {
  const isEdit = mode === MODAL_MODE.EDIT
  const [imageFile, setImageFile] = useState<File | null>(null)

  const createForm = useForm<
    CreateEmotionFormInput,
    unknown,
    CreateEmotionFormValues
  >({
    resolver: zodResolver(createEmotionSchema),
    defaultValues: createEmotionDefaultValues,
  })

  const updateForm = useForm<
    UpdateEmotionFormInput,
    unknown,
    UpdateEmotionFormValues
  >({
    resolver: zodResolver(updateEmotionSchema),
    defaultValues: updateEmotionDefaultValues,
  })

  useEffect(() => {
    if (!open) return

    setTimeout(() => {
      setImageFile(null)
    }, 0)

    if (isEdit && emotion) {
      updateForm.reset({ name: emotion.name })
      return
    }

    createForm.reset(createEmotionDefaultValues)
  }, [open, isEdit, emotion, createForm, updateForm])

  function handleCreateSubmit(values: CreateEmotionFormValues) {
    onCreate(values, imageFile)
  }

  function handleUpdateSubmit(values: UpdateEmotionFormValues) {
    onUpdate(values, imageFile)
  }

  const formId = isEdit ? "emotion-edit-form" : "emotion-create-form"
  const title = isEdit ? "Sửa biểu cảm" : "Thêm biểu cảm"
  const description = isEdit
    ? "Mã biểu cảm không thể thay đổi sau khi tạo."
    : "Mã dùng trong hệ thống — chỉ chữ in hoa, số và dấu gạch dưới."

  const imageUploadKey = `${mode}-${emotion?.id ?? "new"}-${String(open)}`

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
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
          <Button type="submit" form={formId} disabled={loading}>
            {loading ? "Đang xử lý..." : "Lưu"}
          </Button>
        </>
      }
    >
      {isEdit ? (
        <Form {...updateForm}>
          <form
            id={formId}
            className="space-y-4"
            onSubmit={updateForm.handleSubmit(handleUpdateSubmit)}
          >
            <div className="space-y-2">
              <p className="text-sm font-medium">Mã</p>
              <p className="rounded-md border bg-muted/40 px-3 py-2 font-mono text-sm">
                {emotion?.code}
              </p>
            </div>
            <FormInput
              control={updateForm.control}
              name="name"
              label="Tên biểu cảm"
              placeholder="Vui, Buồn, Ngạc nhiên..."
              required
            />
            <EmotionImageUpload
              key={imageUploadKey}
              existingImageUrl={emotion?.imageUrl}
              disabled={loading}
              onFileChange={setImageFile}
            />
          </form>
        </Form>
      ) : (
        <Form {...createForm}>
          <form
            id={formId}
            className="space-y-4"
            onSubmit={createForm.handleSubmit(handleCreateSubmit)}
          >
            <FormInput
              control={createForm.control}
              name="code"
              label="Mã biểu cảm"
              placeholder="HAPPY, SAD, FOCUS..."
              required
            />
            <FormInput
              control={createForm.control}
              name="name"
              label="Tên biểu cảm"
              placeholder="Vui, Buồn, Tập trung..."
              required
            />
            <EmotionImageUpload
              key={imageUploadKey}
              disabled={loading}
              onFileChange={setImageFile}
            />
          </form>
        </Form>
      )}
    </FormDialog>
  )
}
