import { Check } from "lucide-react"
import { motion } from "framer-motion"

interface ProductHighlightsProps {
  description: string
}

export function ProductHighlights({ description }: ProductHighlightsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-10 bg-white p-6 rounded-lg shadow-sm"
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Descrição do produto</h2>
        <p className="text-gray-700 mb-4 text-sm leading-relaxed">{description}</p>

        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <Check className="h-5 w-5 text-emerald-500 mt-0.5" />
            <span><strong>Material externo:</strong> Mesh respirável e couro sintético</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-5 w-5 text-emerald-500 mt-0.5" />
            <span><strong>Solado:</strong> Borracha antiderrapante com tecnologia de absorção de impacto</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-5 w-5 text-emerald-500 mt-0.5" />
            <span><strong>Palmilha:</strong> Removível com espuma de memória</span>
          </li>
        </ul>
      </div>
    </motion.section>
  )
}
