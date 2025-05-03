import { useAppContext } from "@/context/app/useAppContext";
import { LegendList } from "@legendapp/list";
import { MemberItem } from "./member.item";

function MemberList() {
  const { members } = useAppContext();

  return (
    <LegendList
      data={members}
      keyExtractor={(member) => member.id}
      renderItem={({ item }) => <MemberItem {...item} />}
      estimatedItemSize={320}
    />
  );
}

export { MemberList };
