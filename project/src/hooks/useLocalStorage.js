import { useState, useEffect } from "react";

export default function useLocalStorage(key, defaultValue = null) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (e) {
      console.log(e);
      return defaultValue;
    }
  });

  useEffect(
    (key) => {
      const rawValue = JSON.stringify(value);
      window.localStorage.setItem(key, rawValue);
    },
    [value]
  );

  const reset = (key) => {
    window.localStorage.removeItem(key);
    setValue([]);
  };

  return [value, setValue, reset];
}
