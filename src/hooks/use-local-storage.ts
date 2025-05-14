import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Função para obter o valor inicial do localStorage ou usar o valor padrão
  const getInitialValue = () => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error("Erro ao recuperar do localStorage:", error)
      return initialValue
    }
  }

  // Estado para armazenar o valor atual
  const [storedValue, setStoredValue] = useState<T>(getInitialValue)

  // Função para atualizar o valor no estado e no localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitir que o valor seja uma função (como em setState)
      const valueToStore = value instanceof Function ? value(storedValue) : value

      // Salvar no estado
      setStoredValue(valueToStore)

      // Salvar no localStorage
      localStorage.setItem(key, JSON.stringify(valueToStore))

      // Atualizar o timestamp da última atualização
      localStorage.setItem(`${key}_timestamp`, Date.now().toString())
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error)
    }
  }

  // Verificar se os dados expiram a cada vez que o componente é montado
  useEffect(() => {
    const checkExpiration = () => {
      const timestamp = localStorage.getItem(`${key}_timestamp`)
      if (timestamp) {
        const lastUpdate = Number.parseInt(timestamp, 10)
        const now = Date.now()
        const fifteenMinutes = 15 * 60 * 1000

        if (now - lastUpdate > fifteenMinutes) {
          localStorage.removeItem(key)
          localStorage.removeItem(`${key}_timestamp`)
          setStoredValue(initialValue)
        }
      }
    }

    checkExpiration()
  }, [key, initialValue])

  return [storedValue, setValue] as const
}
