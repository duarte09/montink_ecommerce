export interface ImageType {
  url: string
  alt: string
}

export interface ColorVariant {
  id: string
  name: string
  value: string
  images: ImageType[]
}

export interface SizeVariant {
  id: string
  name: string
  available: boolean
}

export interface VariantsType {
  colors: ColorVariant[]
  sizes: SizeVariant[]
}

export interface SelectedVariantsType {
  color: string
  size: string
}

export interface ProductType {
  id: string
  title: string
  price: number
  description: string
  variants: VariantsType
}
