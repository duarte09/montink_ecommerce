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
import { ProductHighlights } from "../components/PageComponents/ProductsHighLight"

export function ProductPage() {
  const product = mockProduct

  const [selectedImageIndex, setSelectedImageIndex] = useLocalStorage<number>("selectedImageIndex", 0)
  const [selectedVariants, setSelectedVariants] = useLocalStorage<SelectedVariantsType>("selectedVariants", {
    color: product.variants.colors[0]?.id || "",
    size: product.variants.sizes[0]?.id || "",
  })
  const [shippingInfo, setShippingInfo] = useLocalStorage<{
    cep: string
    address: string | null
  }>("shippingInfo", {
    cep: "",
    address: null,
  })
  const [quantity, setQuantity] = useLocalStorage<number>("quantity", 1)

  const currentColorImages = useMemo(() => {
    const selectedColor = product.variants.colors.find((color) => color.id === selectedVariants.color)
    return selectedColor?.images || []
  }, [product.variants.colors, selectedVariants.color])

  useEffect(() => {
    setSelectedImageIndex(0)
  }, [selectedVariants.color, setSelectedImageIndex])

  useEffect(() => {
    const clearDataTimeout = setTimeout(() => {
      localStorage.removeItem("selectedImageIndex")
      localStorage.removeItem("selectedVariants")
      localStorage.removeItem("shippingInfo")
      localStorage.removeItem("quantity")
    }, 15 * 60 * 1000)

    return () => clearTimeout(clearDataTimeout)
  }, [])

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index)
  }

  const handleVariantChange = (type: keyof SelectedVariantsType, value: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const handleShippingInfoChange = (cep: string, address: string | null) => {
    setShippingInfo({ cep, address })
  }

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    if (selectedVariants.color && selectedVariants.size) {
      alert(`Produto adicionado ao carrinho!
      - Cor: ${product.variants.colors.find((c) => c.id === selectedVariants.color)?.name}
      - Tamanho: ${selectedVariants.size}
      - Quantidade: ${quantity}`)
    }
  }

  return (
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
          {/* Galeria e descrição (desktop) */}
          <div className="lg:w-2/5">
            <ImageGallery
              images={currentColorImages}
              selectedIndex={selectedImageIndex}
              onSelectImage={handleImageSelect}
            />

            {/* Somente no desktop */}
            <div className="hidden lg:block">
              <ProductHighlights description={product.description} />
            </div>
          </div>

          {/* Infos e ações */}
          <div className="lg:w-3/5">
            <ProductInfo
              title={product.title}
              price={product.price}
            />

            <div className="mt-8 space-y-6">
              <VariantSelector
                variants={product.variants}
                selectedVariants={selectedVariants}
                onVariantChange={handleVariantChange}
              />

              {/* Campo de quantidade */}
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
                    onChange={(e) =>
                      handleQuantityChange(Number.parseInt(e.target.value) || 1)
                    }
                    className="w-full border-t border-b border-gray-300 px-3 py-2 text-center text-gray-900 focus:outline-none hide-number-input-arrows"
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

              {/* Descrição abaixo do ProductActions (mobile) */}
              <div className="block lg:hidden">
                <ProductHighlights description={product.description} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductPage
