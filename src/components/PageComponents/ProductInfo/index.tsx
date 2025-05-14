import { Star } from "lucide-react"
import { formatCurrency } from "../../../utils/format"

interface ProductInfoProps {
  title: string
  price: number
}

export function ProductInfo({ title, price }: ProductInfoProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {/* Badge e frete */}
        <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs">
            <Star className="mr-1 h-3 w-3" fill="currentColor" />
            Mais vendido
          </span>
          <span>•</span>
          <span>Frete grátis para todo o Brasil</span>
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>

        {/* Preço */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">{formatCurrency(price)}</span>
          {price > 100 && (
            <span className="text-sm text-gray-500">
              ou 10x de {formatCurrency(price / 10)} sem juros
            </span>
          )}
        </div>

        {/* Avaliação */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-sm text-gray-500">(128 avaliações)</span>
        </div>
      </div>
    </div>
  )
}
