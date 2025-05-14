import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
      localStorage.setItem(`${key}_timestamp`, Date.now().toString());
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error);
    }
  }, [key, storedValue]);

  // Expiração de 15 minutos
  useEffect(() => {
    const timestamp = localStorage.getItem(`${key}_timestamp`);
    if (timestamp) {
      const lastUpdate = Number(timestamp);
      if (Date.now() - lastUpdate > 15 * 60 * 1000) {
        localStorage.removeItem(key);
        localStorage.removeItem(`${key}_timestamp`);
        setStoredValue(initialValue);
      }
    }
  }, [key, initialValue]);

  return [storedValue, setStoredValue] as const;
}
