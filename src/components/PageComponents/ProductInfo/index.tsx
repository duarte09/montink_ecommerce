import { formatCurrency } from "../../../utils/format"

interface ProductInfoProps {
  title: string
  price: number
  description: string
}

export function ProductInfo({ title, price, description }: ProductInfoProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs">
            <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Mais vendido
          </span>
          <span>•</span>
          <span>Frete grátis para todo o Brasil</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>

        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">{formatCurrency(price)}</span>
          {price > 100 && (
            <span className="text-sm text-gray-500">ou 10x de {formatCurrency(price / 10)} sem juros</span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="h-5 w-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500">(128 avaliações)</span>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-3">Descrição do produto</h2>
        <p className="text-gray-700 mb-4">{description}</p>

        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <svg className="h-5 w-5 text-emerald-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">
              <span className="font-medium">Material externo:</span> Mesh respirável e couro sintético
            </span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="h-5 w-5 text-emerald-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">
              <span className="font-medium">Solado:</span> Borracha antiderrapante com tecnologia de absorção de impacto
            </span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="h-5 w-5 text-emerald-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">
              <span className="font-medium">Palmilha:</span> Removível com espuma de memória
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
