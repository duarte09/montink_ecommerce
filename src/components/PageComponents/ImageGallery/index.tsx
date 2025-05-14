"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { ImageType } from "../../../types"

interface ImageGalleryProps {
  images: ImageType[]
  selectedIndex: number
  onSelectImage: (index: number) => void
}

export function ImageGallery({ images, selectedIndex, onSelectImage }: ImageGalleryProps) {
  const [mainImage, setMainImage] = useState<ImageType>(images[selectedIndex] || { url: "", alt: "" })
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Atualizar a imagem principal quando o índice selecionado ou as imagens mudarem
  useEffect(() => {
    if (images.length > 0) {
      // Garantir que o índice selecionado está dentro dos limites
      const validIndex = Math.min(selectedIndex, images.length - 1)
      setMainImage(images[validIndex])
    } else {
      setMainImage({ url: "", alt: "" })
    }
  }, [selectedIndex, images])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isZoomed) {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - left) / width) * 100
      const y = ((e.clientY - top) / height) * 100
      setMousePosition({ x, y })
    }
  }

  // Se não houver imagens, mostrar um placeholder
  if (images.length === 0) {
    return (
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white flex items-center justify-center">
          <p className="text-gray-500">Nenhuma imagem disponível</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Imagem principal */}
      <div
        className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <div
          className={`h-full w-full transition-transform duration-200 ${isZoomed ? "scale-150" : "scale-100"}`}
          style={
            isZoomed
              ? {
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                }
              : undefined
          }
        >
          <img
            src={mainImage.url || "/placeholder.svg?text=Imagem+não+disponível"}
            alt={mainImage.alt}
            className="h-full w-full object-contain"
            onError={(e) => {
              // Fallback para imagem não encontrada
              e.currentTarget.src = "/placeholder.svg?text=Imagem+não+encontrada"
            }}
          />
        </div>
      </div>

      {/* Miniaturas */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onSelectImage(index)}
            className={`relative aspect-square overflow-hidden rounded-md border transition-all ${
              selectedIndex === index
                ? "border-emerald-500 ring-2 ring-emerald-500"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <img
              src={image.url || "/placeholder.svg?text=Miniatura"}
              alt={`Miniatura ${index + 1}`}
              className="h-full w-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?text=Miniatura+não+encontrada"
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
