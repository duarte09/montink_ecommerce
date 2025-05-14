import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-emerald-600">MontinkSneakers</h1>

        <nav className="hidden md:flex gap-6 text-gray-600 font-medium">
          <a href="/" className="hover:text-emerald-600 transition-colors">Inicio</a>
          <a href="/" className="hover:text-emerald-600 transition-colors">Produtos</a>
          <a href="/" className="hover:text-emerald-600 transition-colors">Contato</a>
        </nav>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-800">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col px-6 py-4 gap-4 text-gray-600 font-medium">
            <a href="/" className="hover:text-emerald-600">Inicio</a>
            <a href="/" className="hover:text-emerald-600">Produtos</a>
            <a href="/" className="hover:text-emerald-600">Contato</a>
          </div>
        </div>
      )}
    </header>
  )
}