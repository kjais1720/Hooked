import { useState } from "react";

export const useDebouncedFunction = (functionToDebounce, interval) => {
  const [timeoutId, setTimeoutId] = useState(null);
  // useEffect(()=>{

  // },[])
  const debouncedFunction = (...arg) => {
    clearTimeout(timeoutId);
    const newTimeout = setTimeout(() => functionToDebounce(...arg), interval);
    setTimeoutId(newTimeout);
  };
  return debouncedFunction;
};
