import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

function useQueryStorage<S>(key: string, initialValue: S): [S, Dispatch<SetStateAction<S>>] {
  const [storedValue, setStoredValue] = useState<S>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const item = params.get(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  function setValue(value: SetStateAction<S>) {
    try {
      const store = value instanceof Function ? value(storedValue) : value;
      const params = new URLSearchParams(window.location.search);
      setStoredValue(store);
      params.set(key, JSON.stringify(store));
      window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
    } catch (error) {
      // Do nothing
    }
  }

  return [storedValue, setValue];
}

export default useQueryStorage;
