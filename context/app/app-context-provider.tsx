import { TBill } from "@/types/bill";
import { createContext, PropsWithChildren, useState } from "react";

// ----------------------------------------------------------------------

type AppContextProps = {
  bills: Array<TBill>;
  // ----------------------------------------------------------------------
  onAddBill: (bill: TBill) => void;
};

// ----------------------------------------------------------------------

const AppContext = createContext<AppContextProps | null>(null);

// ----------------------------------------------------------------------

function AppContextProvider({ children }: PropsWithChildren) {
  const [bills, setBills] = useState<AppContextProps["bills"]>([]);

  // ----------------------------------------------------------------------

  const onAddBill = (bill: TBill) => {
    setBills((prev) => [...prev, bill]);
  };

  return (
    <AppContext.Provider
      value={{
        bills,
        onAddBill,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider };
