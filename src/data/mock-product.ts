import type { ProductType } from "../types"

export const mockProduct: ProductType = {
  id: "1",
  title: "Tênis Campus 00s Beta",
  price: 299.9,
  description:
    "O tênis Campus 00s Beta acompanha você aonde for. O suede premium envolve o cabedal, acentuado por detalhes perfurados e língua em malha elástica para maior fluxo de ar. Inspirado nos arquivos adidas do fim dos anos 90, este tênis de lifestyle tem uma vibe old-school que está de volta. Seja para andar pelas calçadas movimentadas ou tomar um café com os amigos, o solado de borracha durável oferece aderência para que você possa se concentrar nos momentos que realmente importam. Um tênis com histórias para contar, o Campus 00s Beta é uma versão moderna de um ícone que resistiu ao teste do tempo.",
  variants: {
    colors: [
      {
        id: "red-white",
        name: "Vermelho",
        value: "#CC0000",
        images: [
          {
            url: "/images/products/tenisVermelho1.png",
            alt: "Tênis vermelho - vista frontal",
          },
          {
            url: "/images/products/tenisVermelho2.png",
            alt: "Tênis vermelho - vista lateral",
          },
          {
            url: "/images/products/tenisVermelho3.png",
            alt: "Tênis vermelho - vista traseira",
          },
          {
            url: "/images/products/tenisVermelho4.png",
            alt: "Tênis vermelho - vista superior",
          },
        ],
      },
      {
        id: "gray-green",
        name: "Cinza",
        value: "#666666",
        images: [
          {
            url: "/images/products/tenisCinza1.png",
            alt: "Tênis cinza - vista frontal",
          },
          {
            url: "/images/products/tenisCinza2.png",
            alt: "Tênis cinza - vista lateral",
          },
          {
            url: "/images/products/tenisCinza3.png",
            alt: "Tênis cinza - vista traseira",
          },
          {
            url: "/images/products/tenisCinza4.png",
            alt: "Tênis cinza - vista superior",
          },
        ],
      },
      {
        id: "black",
        name: "Preto",
        value: "#000000",
        images: [
          {
            url: "/images/products/tenisPreto1.png",
            alt: "Tênis preto - vista frontal",
          },
          {
            url: "/images/products/tenisPreto2.png",
            alt: "Tênis preto - vista lateral",
          },
          {
            url: "/images/products/tenisPreto3.png",
            alt: "Tênis preto - vista traseira",
          },
          {
            url: "/images/products/tenisPreto4.png",
            alt: "Tênis preto - vista superior",
          },
        ],
      },
    ],
    sizes: [
      {
        id: "38",
        name: "38",
        available: true,
      },
      {
        id: "39",
        name: "39",
        available: true,
      },
      {
        id: "40",
        name: "40",
        available: true,
      },
      {
        id: "41",
        name: "41",
        available: true,
      },
      {
        id: "42",
        name: "42",
        available: false,
      },
      {
        id: "43",
        name: "43",
        available: true,
      },
    ],
  },
}
