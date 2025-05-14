import { useEffect, useMemo } from "react"
import { ImageGallery } from "../components/PageComponents/ImageGallery"
import { ProductInfo } from "../components/PageComponents/ProductInfo"
import { VariantSelector } from "../components/PageComponents/VariantSelector"
import { ShippingCalculator } from "../components/PageComponents/ShippingCalculator"
import { useLocalStorage } from "../hooks/use-local-storage"
import { mockProduct } from "../data/mock-product"
import type { SelectedVariantsType } from "../types"
import { Breadcrumb } from "../components/ui/Breadcrumb"
import { ProductActions } from "../components/PageComponents/ProductActions"

export function ProductPage() {
  // Carregar produto da API (mock para este exemplo)
  const product = mockProduct

  // Estado para armazenar a imagem selecionada
  const [selectedImageIndex, setSelectedImageIndex] = useLocalStorage<number>("selectedImageIndex", 0)

  // Estado para armazenar as variantes selecionadas
  const [selectedVariants, setSelectedVariants] = useLocalStorage<SelectedVariantsType>("selectedVariants", {
    color: product.variants.colors[0]?.id || "",
    size: product.variants.sizes[0]?.id || "",
  })

  // Estado para armazenar o CEP e endereço
  const [shippingInfo, setShippingInfo] = useLocalStorage<{
    cep: string
    address: string | null
  }>("shippingInfo", {
    cep: "",
    address: null,
  })

  // Estado para controlar a quantidade
  const [quantity, setQuantity] = useLocalStorage<number>("quantity", 1)

  // Obter as imagens da cor selecionada
  const currentColorImages = useMemo(() => {
    const selectedColor = product.variants.colors.find((color) => color.id === selectedVariants.color)
    return selectedColor?.images || []
  }, [product.variants.colors, selectedVariants.color])

  // Resetar o índice da imagem selecionada quando a cor mudar
  useEffect(() => {
    setSelectedImageIndex(0)
  }, [selectedVariants.color, setSelectedImageIndex])

  // Limpar o localStorage após 15 minutos de inatividade
  useEffect(() => {
    const clearDataTimeout = setTimeout(
      () => {
        localStorage.removeItem("selectedImageIndex")
        localStorage.removeItem("selectedVariants")
        localStorage.removeItem("shippingInfo")
        localStorage.removeItem("quantity")
      },
      15 * 60 * 1000,
    ) // 15 minutos

    return () => clearTimeout(clearDataTimeout)
  }, [])

  // Função para atualizar a imagem selecionada
  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index)
  }

  // Função para atualizar as variantes selecionadas
  const handleVariantChange = (type: keyof SelectedVariantsType, value: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  // Função para atualizar o CEP e endereço
  const handleShippingInfoChange = (cep: string, address: string | null) => {
    setShippingInfo({
      cep,
      address,
    })
  }

  // Função para atualizar a quantidade
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity)
  }

  // Função para adicionar ao carrinho
  const handleAddToCart = () => {
    if (selectedVariants.color && selectedVariants.size) {
      alert(`Produto adicionado ao carrinho!
      - Cor: ${product.variants.colors.find((c) => c.id === selectedVariants.color)?.name}
      - Tamanho: ${selectedVariants.size}
      - Quantidade: ${quantity}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">ShoeStore</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Calçados", href: "/calcados" },
            { label: "Tênis", href: "/calcados/tenis" },
            { label: product.title, href: "#", current: true },
          ]}
        />

        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/5">
              <ImageGallery
                images={currentColorImages}
                selectedIndex={selectedImageIndex}
                onSelectImage={handleImageSelect}
              />
            </div>

            <div className="lg:w-3/5">
              <ProductInfo title={product.title} price={product.price} description={product.description} />

              <div className="mt-8 space-y-6">
                <VariantSelector
                  variants={product.variants}
                  selectedVariants={selectedVariants}
                  onVariantChange={handleVariantChange}
                />

                <div className="py-4">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade
                  </label>
                  <div className="flex items-center w-32">
                    <button
                      type="button"
                      className="rounded-l-md border border-gray-300 px-3 py-2 text-gray-900 hover:bg-gray-50"
                      onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
                      className="w-full border-t border-b border-gray-300 px-3 py-2 text-center text-gray-900 focus:outline-none"
                    />
                    <button
                      type="button"
                      className="rounded-r-md border border-gray-300 px-3 py-2 text-gray-900 hover:bg-gray-50"
                      onClick={() => handleQuantityChange(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <ShippingCalculator
                  cep={shippingInfo.cep}
                  address={shippingInfo.address}
                  onShippingInfoChange={handleShippingInfoChange}
                />

                <ProductActions
                  canAddToCart={!!selectedVariants.color && !!selectedVariants.size}
                  onAddToCart={handleAddToCart}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ShoeStore</h3>
              <p className="text-gray-300">A melhor loja de calçados online do Brasil.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Termos de Uso
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <p className="text-gray-300">contato@shoestore.com.br</p>
              <p className="text-gray-300">(11) 99999-9999</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>© 2025 ShoeStore. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ProductPage
