import { ShoppingCart, Heart } from "lucide-react";
interface ProductActionsProps {
  canAddToCart: boolean;
  onAddToCart: () => void;
}

export function ProductActions({ canAddToCart, onAddToCart }: ProductActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <button
        className={`flex-1 ${
          canAddToCart ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-400 cursor-not-allowed"
        } text-white py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center gap-2`}
        disabled={!canAddToCart}
        onClick={onAddToCart}
      >
        <ShoppingCart size={20} />
        Adicionar ao carrinho
      </button>

      <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center gap-2">
        <Heart size={20} />
        Adicionar à lista de desejos
      </button>
    </div>
  );
}