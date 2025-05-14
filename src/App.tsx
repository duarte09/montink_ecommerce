import { ProductPage } from "./pages/ProductPage"
import { ThemeProvider } from "./components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ecommerce-theme">
      <div className="min-h-screen bg-gray-50">
        <ProductPage />
      </div>
    </ThemeProvider>
  )
}

export default App
