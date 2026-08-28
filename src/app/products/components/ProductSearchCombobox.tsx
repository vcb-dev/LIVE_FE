import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"

import {
  listProductsQueryOptions,
  productDetailQueryOptions,
  productKeys,
} from "@/app/products/queries/product-query"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useDebounce } from "@/hooks/useDebounce"
import { cn } from "@/lib/utils"

import type { Product } from "../types/product"

interface ProductSearchComboboxProps {
  value?: string
  onChange: (productId: string) => void
  disabled?: boolean
  placeholder?: string
  searchPlaceholder?: string
}

export function ProductSearchCombobox({
  value,
  onChange,
  disabled,
  placeholder = "Chọn sản phẩm...",
  searchPlaceholder = "Tìm theo mã hoặc tên sản phẩm...",
}: ProductSearchComboboxProps) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 300)

  const { data: selectedProduct } = useQuery({
    ...productDetailQueryOptions(value ?? ""),
    enabled: !!value,
  })

  const {
    data: searchResults,
    isLoading,
    isFetching,
  } = useQuery({
    ...listProductsQueryOptions({
      page: 1,
      limit: 50,
      q: debouncedSearch || undefined,
      isActive: true,
    }),
    enabled: open,
  })

  const results = searchResults?.data ?? []
  const loading = isLoading || isFetching

  function handleSelect(product: Product) {
    queryClient.setQueryData(productKeys.detail(product.id), product)
    onChange(product.id)
    setOpen(false)
    setSearch("")
  }

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {selectedProduct
            ? `${selectedProduct.code} — ${selectedProduct.name}`
            : placeholder}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="z-[200] w-(--radix-popover-trigger-width) p-0"
        align="start"
        onOpenAutoFocus={(event) => event.preventDefault()}
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            value={search}
            onValueChange={setSearch}
            autoFocus
          />
          <CommandList>
            <CommandEmpty>
              {loading ? "Đang tìm..." : "Không tìm thấy sản phẩm"}
            </CommandEmpty>
            <CommandGroup>
              {results.map((product) => (
                <CommandItem
                  key={product.id}
                  value={product.id}
                  onSelect={() => handleSelect(product)}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === product.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {product.code}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
