export function Footer() {
  return (
    <footer className="bg-white border-t mt-12 text-gray-700">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-lg font-semibold text-emerald-600 mb-3">MontinkSneakers</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            A melhor loja de calçados online do Brasil. Qualidade, conforto e estilo em cada passo.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-emerald-600 mb-3">Links Úteis</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-emerald-600 transition-colors">Sobre Nós</a></li>
            <li><a href="#" className="hover:text-emerald-600 transition-colors">Política de Privacidade</a></li>
            <li><a href="#" className="hover:text-emerald-600 transition-colors">Termos de Uso</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-emerald-600 mb-3">Contato</h3>
          <p className="text-sm text-gray-600">Email: contato@montinksneakers.com.br</p>
          <p className="text-sm text-gray-600">Telefone: (11) 99999-9999</p>
        </div>
      </div>
      <div className="border-t text-center py-6 text-sm text-gray-500">
        © 2025 MontinkSneakers. Todos os direitos reservados.
      </div>
    </footer>
  )
}
