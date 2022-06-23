import { Toaster } from "react-hot-toast";

export function Toast() {
  return (
    <Toaster
      position={"top-center"}
      toastOptions={{
        className:"bg-primary text-dark-200 font-medium",
        style:{
          background:"hsl(174, 86%, 44%)",
          color:"hsl(195, 100%, 6%)"
        }
      }}
    />
  );
}
