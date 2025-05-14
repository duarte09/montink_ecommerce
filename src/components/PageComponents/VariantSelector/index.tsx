"use client"

import type { VariantsType, SelectedVariantsType } from "../../../types"

interface VariantSelectorProps {
  variants: VariantsType
  selectedVariants: SelectedVariantsType
  onVariantChange: (type: keyof SelectedVariantsType, value: string) => void
}

export function VariantSelector({ variants, selectedVariants, onVariantChange }: VariantSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Seletor de cores */}
      {variants.colors.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-900">Cor</h3>
            <span className="text-sm text-gray-500">
              {variants.colors.find((c) => c.id === selectedVariants.color)?.name || "Selecione uma cor"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {variants.colors.map((color) => (
              <button
                key={color.id}
                onClick={() => onVariantChange("color", color.id)}
                className={`group relative h-10 w-10 rounded-full border transition-all ${
                  selectedVariants.color === color.id
                    ? "ring-2 ring-emerald-500 ring-offset-2"
                    : "ring-1 ring-gray-200 hover:ring-gray-300"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                <span className="sr-only">{color.name}</span>
                {selectedVariants.color === color.id && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
                <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {color.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Seletor de tamanhos */}
      {variants.sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-900">Tamanho</h3>
            <button className="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors">
              Guia de tamanhos
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
            {variants.sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => onVariantChange("size", size.id)}
                className={`flex items-center justify-center rounded-md border py-2 px-3 text-sm font-medium transition-colors ${
                  selectedVariants.size === size.id
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 text-gray-900 hover:bg-gray-50"
                } ${!size.available ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={!size.available}
              >
                {size.name}
                {!size.available && <span className="sr-only"> (Indisponível)</span>}
              </button>
            ))}
          </div>
          {!selectedVariants.size && <p className="mt-2 text-sm text-amber-600">Selecione um tamanho para continuar</p>}
        </div>
      )}
    </div>
  )
}
