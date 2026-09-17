import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

import { FormInput } from "@/components/FieldCustom/FormInput"
import { FormSelect } from "@/components/FieldCustom/FormSelect"
import { FormDialog } from "@/components/UiCustom/FormDialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { MODAL_MODE, type ModalModeType } from "@/constants/common"

import {
  ROLE_OPTIONS,
  createUserDefaultValues,
  createUserSchema,
  updateUserDefaultValues,
  updateUserSchema,
  type CreateUserFormInput,
  type CreateUserFormValues,
  type UpdateUserFormInput,
  type UpdateUserFormValues,
} from "../schemas/user-form.schema"
import type { User } from "../types/user"

interface UserFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: ModalModeType
  user?: User | null
  loading?: boolean
  onCreate: (values: CreateUserFormValues) => void
  onUpdate: (values: UpdateUserFormValues) => void
}

export function UserFormDialog({
  open,
  onOpenChange,
  mode,
  user,
  loading,
  onCreate,
  onUpdate,
}: UserFormDialogProps) {
  const isEdit = mode === MODAL_MODE.EDIT

  const createForm = useForm<
    CreateUserFormInput,
    unknown,
    CreateUserFormValues
  >({
    resolver: zodResolver(createUserSchema),
    defaultValues: createUserDefaultValues,
  })

  const updateForm = useForm<
    UpdateUserFormInput,
    unknown,
    UpdateUserFormValues
  >({
    resolver: zodResolver(updateUserSchema),
    defaultValues: updateUserDefaultValues,
  })

  useEffect(() => {
    if (!open) return

    if (isEdit && user) {
      updateForm.reset({
        password: "",
        role: user.role,
        isActive: user.isActive,
      })
      return
    }

    createForm.reset(createUserDefaultValues)
  }, [open, isEdit, user, createForm, updateForm])

  const formId = isEdit ? "user-edit-form" : "user-create-form"
  const title = isEdit ? "Sửa người dùng" : "Thêm người dùng"
  const description = isEdit
    ? "Email không thể thay đổi. Để trống mật khẩu nếu không đổi."
    : "Tạo tài khoản mới cho hệ thống livestream."

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
            onSubmit={updateForm.handleSubmit(onUpdate)}
          >
            <div className="space-y-2">
              <p className="text-sm font-medium">Email</p>
              <p className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
                {user?.email}
              </p>
            </div>
            <FormInput
              control={updateForm.control}
              name="password"
              label="Mật khẩu mới"
              type="password"
              placeholder="Để trống nếu không đổi"
            />
            <FormSelect
              control={updateForm.control}
              name="role"
              label="Vai trò"
              placeholder="Chọn vai trò"
              options={ROLE_OPTIONS}
              required
            />
            <FormField
              control={updateForm.control}
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
                    <FormLabel>Tài khoản hoạt động</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Tài khoản vô hiệu sẽ không thể đăng nhập.
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      ) : (
        <Form {...createForm}>
          <form
            id={formId}
            className="space-y-4"
            onSubmit={createForm.handleSubmit(onCreate)}
          >
            <FormInput
              control={createForm.control}
              name="email"
              label="Email"
              type="email"
              placeholder="user@live.vcb"
              required
            />
            <FormInput
              control={createForm.control}
              name="password"
              label="Mật khẩu"
              type="password"
              placeholder="Tối thiểu 6 ký tự"
              required
            />
            <FormSelect
              control={createForm.control}
              name="role"
              label="Vai trò"
              placeholder="Chọn vai trò"
              options={ROLE_OPTIONS}
              required
            />
            <FormField
              control={createForm.control}
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
                    <FormLabel>Tài khoản hoạt động</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </FormDialog>
  )
}
