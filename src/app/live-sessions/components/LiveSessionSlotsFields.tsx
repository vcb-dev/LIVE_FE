import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useFieldArray, useFormContext } from "react-hook-form"

import { listBlockGroupsQueryOptions } from "@/app/block-groups/queries/block-group-query"
import { formatDuration } from "@/app/home/utils/format-duration"
import { ProductSearchCombobox } from "@/app/products/components/ProductSearchCombobox"
import { FormInput } from "@/components/FieldCustom/FormInput"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { emptySlot } from "../schemas/live-session-form.schema"
import type { LiveSessionFormInput } from "../schemas/live-session-form.schema"
import { SEGMENT_KIND_LABELS, SLOT_KINDS } from "../types/live-session"

const RANDOM_GROUP = "RANDOM"

export function LiveSessionSlotsFields() {
  const form = useFormContext<LiveSessionFormInput>()
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "slots",
  })

  const { data: ctaGroups } = useQuery(
    listBlockGroupsQueryOptions({ page: 1, limit: 100, type: "CTA" })
  )

  const groupOptions = (ctaGroups?.data ?? []).filter((group) => group.isActive)
  const slots = form.watch("slots")
  const totalSec = (slots ?? []).reduce(
    (sum, slot) => sum + (Number(slot.plannedSec) || 0),
    0
  )

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium">Thứ tự lên sóng</p>
        <p className="text-sm text-muted-foreground">
          Tổng {formatDuration(totalSec)}
        </p>
      </div>

      {fields.map((field, index) => {
        const kind = slots?.[index]?.kind ?? field.kind

        return (
          <div
            key={field.id}
            className="grid gap-3 rounded-md border p-3 sm:grid-cols-[auto_1fr_140px_auto] sm:items-end"
          >
            <div className="flex items-center gap-2 sm:pb-2">
              <span className="w-6 text-sm text-muted-foreground">
                {index + 1}
              </span>
              <Badge variant="outline">{SEGMENT_KIND_LABELS[kind]}</Badge>
            </div>

            {kind === "PRODUCT" ? (
              <FormField
                control={form.control}
                name={`slots.${index}.productId`}
                render={({ field: productField }) => (
                  <FormItem>
                    <FormLabel>
                      Sản phẩm <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <ProductSearchCombobox
                        value={productField.value || undefined}
                        onChange={productField.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : kind === "CTA" ? (
              <FormField
                control={form.control}
                name={`slots.${index}.groupId`}
                render={({ field: groupField }) => (
                  <FormItem>
                    <FormLabel>Nhóm CTA</FormLabel>
                    <Select
                      value={groupField.value || RANDOM_GROUP}
                      onValueChange={(value) =>
                        groupField.onChange(value === RANDOM_GROUP ? "" : value)
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Random nhóm" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={RANDOM_GROUP}>Random nhóm</SelectItem>
                        {groupOptions.map((group) => (
                          <SelectItem key={group.id} value={group.id}>
                            {group.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <p className="self-center text-sm text-muted-foreground sm:pb-2">
                Hệ thống random nội dung khi generate
              </p>
            )}

            <FormInput
              control={form.control}
              name={`slots.${index}.plannedSec`}
              label="Thời lượng (giây)"
              type="number"
              required
            />

            <div className="flex items-center gap-1 sm:pb-0.5">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={index === 0}
                aria-label="Đưa lên"
                onClick={() => move(index, index - 1)}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={index === fields.length - 1}
                aria-label="Đưa xuống"
                onClick={() => move(index, index + 1)}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={fields.length === 1}
                aria-label="Xóa bước"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        )
      })}

      <div className="flex flex-wrap gap-2">
        {SLOT_KINDS.map((kind) => (
          <Button
            key={kind}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append(emptySlot(kind))}
          >
            <Plus className="h-4 w-4" />
            {SEGMENT_KIND_LABELS[kind]}
          </Button>
        ))}
      </div>
    </div>
  )
}
