import { ProductPage } from "./pages/ProductPage"
import { ThemeProvider } from "./components/theme-provider"
import { Header } from "./components/Layout/Header"
import { Footer } from "./components/Layout/Footer"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ecommerce-theme">
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <ProductPage />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
