"use client"

import type React from "react"
import { useState } from "react"
import { fetchAddressByCep } from "../../../services/shipping-service"

interface ShippingCalculatorProps {
  cep: string
  address: string | null
  onShippingInfoChange: (cep: string, address: string | null) => void
}

export function ShippingCalculator({ cep, address, onShippingInfoChange }: ShippingCalculatorProps) {
  const [inputCep, setInputCep] = useState(cep)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Formatar o CEP enquanto o usuário digita
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")

    if (value.length > 8) {
      value = value.slice(0, 8)
    }

    if (value.length > 5) {
      value = value.slice(0, 5) + "-" + value.slice(5)
    }

    setInputCep(value)
    setError(null)
  }

  // Consultar o CEP
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
    } catch (err) {
      setError("Erro ao consultar o CEP. Tente novamente.")
      onShippingInfoChange(inputCep, null)
    } finally {
      setIsLoading(false)
    }
  }

  // Lidar com a tecla Enter no input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCheckCep()
    }
  }

  return (
    <div className="bg-gray-50 p-4 rounded-md mb-6">
      <h3 className="text-base font-medium text-gray-900 mb-3">Calcular frete e prazo</h3>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputCep}
            onChange={handleCepChange}
            onKeyDown={handleKeyDown}
            placeholder="Digite seu CEP"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            maxLength={9}
          />
        </div>

        <div className="flex gap-2">
          <a
            href="https://buscacepinter.correios.com.br/app/endereco/index.php"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:underline self-center whitespace-nowrap"
          >
            Não sei meu CEP
          </a>

          <button
            onClick={handleCheckCep}
            disabled={isLoading}
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 transition-colors"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Consultando
              </span>
            ) : (
              "Consultar"
            )}
          </button>
        </div>
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {address && (
        <div className="border border-gray-200 rounded-md p-4 bg-white">
          <div className="flex items-start gap-2 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-emerald-600 mt-0.5"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
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
                <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium">Entrega padrão</p>
                  <p className="text-sm text-gray-600">Receba em até 7 dias úteis</p>
                </div>
              </div>
              <p className="text-sm font-medium">R$ 19,90</p>
            </div>

            <div className="flex justify-between items-center border-t border-gray-200 pt-3">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
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
