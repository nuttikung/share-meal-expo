import { useContext } from "react";
import { AppContext } from "@/context/app/app-context-provider";

function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be use inside AppContext");
  }

  return context;
}

export { useAppContext };
