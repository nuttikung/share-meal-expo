import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { useCamera } from "@/hooks/useCamera";
import type { TBill, TMember } from "@/types";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

// ----------------------------------------------------------------------

type AppContextProps = {
  bills: Array<TBill>;
  members: Array<TMember>;
  // ----------------------------------------------------------------------
  onAddBill: (bill: TBill) => void;
  onUpdateBill: (bill: TBill) => void;
  onRemoveBill: (id: TBill["id"]) => void;
  // ----------------------------------------------------------------------
  onAddMember: (member: TMember) => Promise<void>;
  onUpdateMember: (member: TMember) => Promise<void>;
  onRemoveMember: (id: TMember["id"]) => Promise<void>;
};

// ----------------------------------------------------------------------

const AppContext = createContext<AppContextProps | null>(null);

// ----------------------------------------------------------------------

function AppContextProvider({ children }: PropsWithChildren) {
  const [bills, setBills] = useState<AppContextProps["bills"]>([]);

  const billsStorage = useAsyncStorage<AppContextProps["bills"]>("bills", []);
  const members = useAsyncStorage<AppContextProps["members"]>("members", []);

  // ----------------------------------------------------------------------

  const onAddBill = (bill: TBill) => {
    setBills((prev) => [...prev, bill]);
  };

  const onUpdateBill = (bill: TBill) => {
    setBills((prev) =>
      prev.map((record) =>
        record.id === bill["id"] ? { ...record, ...bill } : record,
      ),
    );
  };

  const onRemoveBill = (id: TBill["id"]) => {
    setBills((prev) => prev.filter((record) => record.id !== id));
  };

  // ----------------------------------------------------------------------

  const onAddMember = async (member: TMember) => {
    const nextMember = [...members.state, member];
    await members.setState(nextMember);
  };

  const onUpdateMember = async (member: TMember) => {
    const nextMember = members.state.map((record) =>
      record.id === member["id"] ? { ...record, ...member } : record,
    );
    await members.setState(nextMember);
  };

  const onRemoveMember = async (id: TMember["id"]) => {
    const nextMember = members.state.filter((record) => record.id !== id);
    await members.setState(nextMember);
  };

  // ----------------------------------------------------------------------

  // Autosave Bill to local storage
  useEffect(() => {
    billsStorage.setState(bills);
  }, [bills]);

  return (
    <AppContext.Provider
      value={{
        bills,
        members: members.state,
        onAddBill,
        onUpdateBill,
        onRemoveBill,
        onAddMember,
        onUpdateMember,
        onRemoveMember,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext };
