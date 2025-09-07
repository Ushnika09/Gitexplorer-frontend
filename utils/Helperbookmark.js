import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  // Load value from localStorage (only on first render)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return initialValue;
    }
  });

  // Sync changes to localStorage whenever storedValue changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error writing localStorage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}