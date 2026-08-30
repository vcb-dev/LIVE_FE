import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Navigate, useNavigate } from "react-router-dom"

import { LiveSessionSlotsFields } from "@/app/live-sessions/components/LiveSessionSlotsFields"
import { useLiveSessionMutations } from "@/app/live-sessions/hooks/use-live-session-mutations"
import {
  liveSessionDefaultValues,
  liveSessionFormSchema,
  type LiveSessionFormInput,
  type LiveSessionFormValues,
} from "@/app/live-sessions/schemas/live-session-form.schema"
import { FormInput } from "@/components/FieldCustom/FormInput"
import { PageHeader } from "@/components/UiCustom/PageHeader"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { urlPaths } from "@/constants/urlPaths"
import { useIsStaff } from "@/lib/roles"

export default function LiveSessionNewPage() {
  const isStaff = useIsStaff()
  const navigate = useNavigate()
  const { createMutation } = useLiveSessionMutations()

  const form = useForm<LiveSessionFormInput, unknown, LiveSessionFormValues>({
    resolver: zodResolver(liveSessionFormSchema),
    defaultValues: liveSessionDefaultValues,
  })

  if (!isStaff) {
    return <Navigate to={urlPaths.home} replace />
  }

  function handleSubmit(values: LiveSessionFormValues) {
    createMutation.mutate(values, {
      onSuccess: (session) => {
        navigate(urlPaths.liveSessionDetail(session.id))
      },
    })
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <PageHeader
        title="Tạo kịch bản live"
        description="Xếp bước theo ý bạn. CTA và trò chơi không bắt buộc — thêm khi cần, đặt chỗ nào cũng được."
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-3xl space-y-6"
        >
          <FormInput
            control={form.control}
            name="name"
            label="Tên phiên"
            placeholder="Live tối 29/08"
            required
          />

          <LiveSessionSlotsFields />

          <div className="flex gap-2">
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Đang tạo..." : "Tạo"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(urlPaths.liveSessions)}
            >
              Hủy
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
