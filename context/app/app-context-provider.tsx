import { useSQLiteContext } from "expo-sqlite";
import type { TBill, TMember } from "@/types";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
// import { useCamera } from "@/hooks/useCamera";

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
  const db = useSQLiteContext();
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

  const onAddMember = async (member: TMember) => {
    if (member.name === "") {
      return;
    }

    try {
      const QUERY = "INSERT INTO members (name, paid) VALUES (?, ?);";
      await db.runAsync(QUERY, member.name, member.paid);
    } catch (error) {
      // update db failed
    } finally {
      await restoreMembers();
    }
  };

  const onUpdateMember = async (member: TMember) => {
    try {
      member.name;
      const task = [];
      const updateName = db.runAsync(
        "UPDATE members SET name = ? WHERE id = ?;",
        member.name,
        member.id,
      );
      const updatePaid = db.runAsync(
        "UPDATE members SET paid = ? WHERE id = ?;",
        member.paid,
        member.id,
      );
      task.push(updateName);
      task.push(updatePaid);
      await Promise.all(task);
    } catch (error) {
      // error here
    } finally {
      await restoreMembers();
    }
  };

  const onRemoveMember = async (id: TMember["id"]) => {
    try {
      const QUERY = "DELETE FROM members WHERE id = ?;";
      await db.runAsync(QUERY, id);
    } catch (error) {
      // delete failed
    } finally {
      await restoreMembers();
    }
  };

  // ----------------------------------------------------------------------

  const restoreMembers = async () => {
    try {
      const query = await db.prepareAsync("SELECT * FROM MEMBERS");
      const result = await query.executeAsync<TMember>();
      const allMember = await result.getAllAsync();
      console.log("line 83 result: ", allMember);
      setMembers(allMember);
    } catch (error) {
      console.error(error);
    }
  };

  // Restore from SQLite
  useEffect(() => {
    restoreMembers();
  }, []);

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

export { AppContextProvider, AppContext };
