import type { TBill, TMember } from "@/types";
import { createContext, PropsWithChildren, useState } from "react";

// ----------------------------------------------------------------------

type AppContextProps = {
  bills: Array<TBill>;
  members: Array<TMember>;
  // ----------------------------------------------------------------------
  onAddBill: (bill: TBill) => void;
  onUpdateBill: (bill: TBill) => void;
  onRemoveBill: (id: TBill["id"]) => void;
  // ----------------------------------------------------------------------
  onAddMember: (member: TMember) => void;
  onUpdateMember: (member: TMember) => void;
  onRemoveMember: (id: TMember["id"]) => void;
};

// ----------------------------------------------------------------------

const AppContext = createContext<AppContextProps | null>(null);

// ----------------------------------------------------------------------

function AppContextProvider({ children }: PropsWithChildren) {
  const [bills, setBills] = useState<AppContextProps["bills"]>([]);
  const [members, setMembers] = useState<AppContextProps["members"]>([]);

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

  const onAddMember = (member: TMember) => {
    setMembers((prev) => [...prev, member]);
  };

  const onUpdateMember = (member: TMember) => {
    setMembers((prev) =>
      prev.map((record) =>
        record.id === member["id"] ? { ...record, ...member } : record,
      ),
    );
  };

  const onRemoveMember = (id: TMember["id"]) => {
    setMembers((prev) => prev.filter((record) => record.id !== id));
  };

  // ----------------------------------------------------------------------

  return (
    <AppContext.Provider
      value={{
        bills,
        members,
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

export { AppContextProvider };
