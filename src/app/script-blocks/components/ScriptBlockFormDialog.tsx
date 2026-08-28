import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import type { Control } from "react-hook-form"
import { useForm, useWatch } from "react-hook-form"

import {
  BLOCK_TYPE_LABELS,
  SCRIPT_BLOCK_TYPE_OPTIONS,
  type BlockType,
} from "@/app/block-groups/constants/block-type"
import { listBlockGroupsQueryOptions } from "@/app/block-groups/queries/block-group-query"
import { listEmotionsQueryOptions } from "@/app/emotions/queries/emotion-query"
import { ProductSearchCombobox } from "@/app/products/components/ProductSearchCombobox"
import { FormInput } from "@/components/FieldCustom/FormInput"
import { FormSelect } from "@/components/FieldCustom/FormSelect"
import { FormTextarea } from "@/components/FieldCustom/FormTextarea"
import { MultiSelect } from "@/components/FieldCustom/MultiSelect"
import { FormDialog } from "@/components/UiCustom/FormDialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { MODAL_MODE, type ModalModeType } from "@/constants/common"

import {
  createScriptBlockDefaultValues,
  createScriptBlockSchema,
  getContentPlaceholder,
  updateScriptBlockDefaultValues,
  updateScriptBlockSchema,
  type CreateScriptBlockFormInput,
  type CreateScriptBlockFormValues,
  type UpdateScriptBlockFormInput,
  type UpdateScriptBlockFormValues,
} from "../schemas/script-block-form.schema"
import type { ScriptBlock } from "../types/script-block"
import {
  isGroupRequired,
  isProductRequired,
  showsGroupField,
  showsProductField,
} from "../types/script-block"

interface ScriptBlockFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: ModalModeType
  scriptBlock?: ScriptBlock | null
  loading?: boolean
  onCreate: (values: CreateScriptBlockFormValues) => void
  onUpdate: (values: UpdateScriptBlockFormValues) => void
}

export function ScriptBlockFormDialog({
  open,
  onOpenChange,
  mode,
  scriptBlock,
  loading,
  onCreate,
  onUpdate,
}: ScriptBlockFormDialogProps) {
  const isEdit = mode === MODAL_MODE.EDIT

  const createForm = useForm<
    CreateScriptBlockFormInput,
    unknown,
    CreateScriptBlockFormValues
  >({
    resolver: zodResolver(createScriptBlockSchema),
    defaultValues: createScriptBlockDefaultValues,
  })

  const updateForm = useForm<
    UpdateScriptBlockFormInput,
    unknown,
    UpdateScriptBlockFormValues
  >({
    resolver: zodResolver(updateScriptBlockSchema),
    defaultValues: updateScriptBlockDefaultValues,
  })

  const watchedType = useWatch({
    control: createForm.control,
    name: "type",
  }) as BlockType | undefined

  const blockType = isEdit ? scriptBlock?.type : watchedType

  const { data: emotionsData } = useQuery({
    ...listEmotionsQueryOptions({ page: 1, limit: 100 }),
    enabled: open,
  })

  const { data: groupsData } = useQuery({
    ...listBlockGroupsQueryOptions({
      page: 1,
      limit: 100,
      type: blockType && isGroupRequired(blockType) ? blockType : undefined,
    }),
    enabled: open && !!blockType && isGroupRequired(blockType),
  })

  const emotionOptions =
    emotionsData?.data.map((emotion) => ({
      value: emotion.id,
      label: `${emotion.name} (${emotion.code})`,
    })) ?? []

  const groupOptions =
    groupsData?.data.map((group) => ({
      value: group.id,
      label: `${group.name} (${group.code})`,
    })) ?? []

  useEffect(() => {
    if (!open) return

    if (isEdit && scriptBlock) {
      updateForm.reset({
        title: scriptBlock.title ?? "",
        content: scriptBlock.content,
        durationSec: scriptBlock.durationSec,
        weight: scriptBlock.weight,
        isActive: scriptBlock.isActive,
        emotionIds: scriptBlock.emotions.map((emotion) => emotion.id),
      })
      return
    }

    createForm.reset(createScriptBlockDefaultValues)
  }, [open, isEdit, scriptBlock, createForm, updateForm])

  useEffect(() => {
    if (isEdit || !watchedType) return

    if (!showsGroupField(watchedType)) {
      createForm.setValue("groupId", "")
    }
    if (!showsProductField(watchedType)) {
      createForm.setValue("productId", "")
    }
  }, [watchedType, isEdit, createForm])

  const formId = isEdit ? "script-block-edit-form" : "script-block-create-form"
  const title = isEdit ? "Sửa block kịch bản" : "Thêm block kịch bản"
  const description = isEdit
    ? `Loại ${scriptBlock ? BLOCK_TYPE_LABELS[scriptBlock.type] : ""} và phạm vi không thể đổi sau khi tạo.`
    : "Nội dung kịch bản dùng khi generate timeline livestream."

  function handleCreateSubmit(values: CreateScriptBlockFormValues) {
    onCreate(values)
  }

  function handleUpdateSubmit(values: UpdateScriptBlockFormValues) {
    onUpdate(values)
  }

  function renderScopeReadonly() {
    if (!scriptBlock) return null

    return (
      <div className="grid gap-2 rounded-md border bg-muted/40 p-3 text-sm">
        <p>
          <span className="text-muted-foreground">Loại: </span>
          {BLOCK_TYPE_LABELS[scriptBlock.type]}
        </p>
        {scriptBlock.productName ? (
          <p>
            <span className="text-muted-foreground">Sản phẩm: </span>
            {scriptBlock.productCode} — {scriptBlock.productName}
          </p>
        ) : null}
        {scriptBlock.groupName ? (
          <p>
            <span className="text-muted-foreground">Nhóm block: </span>
            {scriptBlock.groupName}
          </p>
        ) : null}
        {!scriptBlock.productName && !scriptBlock.groupName ? (
          <p>
            <span className="text-muted-foreground">Phạm vi: </span>
            Dùng chung
          </p>
        ) : null}
      </div>
    )
  }

  function renderSharedFields(
    formControl: Control<
      UpdateScriptBlockFormInput,
      unknown,
      UpdateScriptBlockFormValues
    >,
    contentType?: BlockType
  ) {
    const typeForPlaceholder = contentType ?? "STORY"

    return (
      <>
        <FormInput
          control={formControl}
          name="title"
          label="Tiêu đề (admin)"
          placeholder="Nhãn ngắn để tìm kiếm, không đọc lên sóng"
        />
        <FormTextarea
          control={formControl}
          name="content"
          label="Nội dung"
          placeholder={getContentPlaceholder(typeForPlaceholder)}
          rows={5}
          required
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <FormInput
            control={formControl}
            name="durationSec"
            label="Thời lượng (giây)"
            type="number"
            required
          />
          <FormInput
            control={formControl}
            name="weight"
            label="Trọng số random"
            type="number"
            required
          />
        </div>
        <FormField
          control={formControl}
          name="emotionIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biểu cảm</FormLabel>
              <FormControl>
                <MultiSelect
                  options={emotionOptions}
                  value={field.value ?? []}
                  onChange={field.onChange}
                  placeholder="Chọn biểu cảm..."
                  searchPlaceholder="Tìm biểu cảm..."
                  emptyMessage="Không có biểu cảm"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={formControl}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-md border p-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onChange={(event) => field.onChange(event.target.checked)}
                  disabled={loading}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Đang hoạt động</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Block tắt sẽ không được chọn khi generate kịch bản.
                </p>
              </div>
            </FormItem>
          )}
        />
      </>
    )
  }

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
            {loading ? "Đang lưu..." : isEdit ? "Lưu thay đổi" : "Tạo block"}
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
            {renderScopeReadonly()}
            {renderSharedFields(updateForm.control, scriptBlock?.type)}
          </form>
        </Form>
      ) : (
        <Form {...createForm}>
          <form
            id={formId}
            className="space-y-4"
            onSubmit={createForm.handleSubmit(handleCreateSubmit)}
          >
            <FormSelect
              control={createForm.control}
              name="type"
              label="Loại block"
              placeholder="Chọn loại"
              options={SCRIPT_BLOCK_TYPE_OPTIONS}
              required
            />

            {blockType && showsGroupField(blockType) ? (
              <FormSelect
                control={createForm.control}
                name="groupId"
                label="Nhóm block"
                placeholder="Chọn nhóm block"
                options={groupOptions}
                required
              />
            ) : null}

            {blockType && showsProductField(blockType) ? (
              <FormField
                control={createForm.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Sản phẩm
                      {isProductRequired(blockType) ? (
                        <span className="text-red-500">*</span>
                      ) : null}
                    </FormLabel>
                    <FormControl>
                      <ProductSearchCombobox
                        value={field.value || undefined}
                        onChange={field.onChange}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            {renderSharedFields(
              createForm.control as unknown as Control<
                UpdateScriptBlockFormInput,
                unknown,
                UpdateScriptBlockFormValues
              >,
              blockType
            )}
          </form>
        </Form>
      )}
    </FormDialog>
  )
}
