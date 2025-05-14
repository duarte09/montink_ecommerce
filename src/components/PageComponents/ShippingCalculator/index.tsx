import type React from "react"
import { useState } from "react"
import { fetchAddressByCep } from "../../../services/shipping-service"
import {
  Loader2,
  MapPin,
  Truck,
  Rocket,
} from "lucide-react"

interface ShippingCalculatorProps {
  cep: string
  address: string | null
  onShippingInfoChange: (cep: string, address: string | null) => void
}

export function ShippingCalculator({ cep, address, onShippingInfoChange }: ShippingCalculatorProps) {
  const [inputCep, setInputCep] = useState(cep)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length > 8) value = value.slice(0, 8)
    if (value.length > 5) value = value.slice(0, 5) + "-" + value.slice(5)
    setInputCep(value)
    setError(null)
  }

  const handleCheckCep = async () => {
    const cleanCep = inputCep.replace(/\D/g, "")

    if (cleanCep.length !== 8) {
      setError("CEP inválido. Digite um CEP com 8 dígitos.")
      onShippingInfoChange(inputCep, null)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const addressData = await fetchAddressByCep(cleanCep)

      if (addressData.erro) {
        setError("CEP não encontrado.")
        onShippingInfoChange(inputCep, null)
      } else {
        const formattedAddress = `${addressData.logradouro}, ${addressData.bairro}, ${addressData.localidade} - ${addressData.uf}, ${addressData.cep}`
        onShippingInfoChange(inputCep, formattedAddress)
      }
    } catch {
      setError("Erro ao consultar o CEP. Tente novamente.")
      onShippingInfoChange(inputCep, null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCheckCep()
    }
  }

  return (
    <div className="bg-gray-50 p-4 rounded-md mb-6">
      <h3 className="text-base font-medium text-gray-900 mb-3">Calcular frete e prazo</h3>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          value={inputCep}
          onChange={handleCepChange}
          onKeyDown={handleKeyDown}
          placeholder="Digite seu CEP"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          maxLength={9}
        />

        <button
          onClick={handleCheckCep}
          disabled={isLoading}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 transition-colors"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin h-4 w-4" />
              Consultando
            </span>
          ) : (
            "Consultar"
          )}
        </button>
      </div>

      <a
        href="https://buscacepinter.correios.com.br/app/endereco/index.php"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-600 hover:underline block mb-3"
      >
        Não sei meu CEP
      </a>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {address && (
        <div className="border border-gray-200 rounded-md p-4 bg-white">
          <div className="flex items-start gap-2 mb-3">
            <MapPin className="text-emerald-600 mt-0.5" size={20} />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {address.split(",")[0]}, {address.split(",")[1]}
              </p>
              <p className="text-sm text-gray-600">
                {address.split(",")[2]}, {address.split(",")[3]}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center border-t border-gray-200 pt-3">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium">Entrega padrão</p>
                  <p className="text-sm text-gray-600">Receba em até 7 dias úteis</p>
                </div>
              </div>
              <p className="text-sm font-medium">R$ 19,90</p>
            </div>

            <div className="flex justify-between items-center border-t border-gray-200 pt-3">
              <div className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium">Entrega expressa</p>
                  <p className="text-sm text-gray-600">Receba em até 2 dias úteis</p>
                </div>
              </div>
              <p className="text-sm font-medium">R$ 29,90</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
