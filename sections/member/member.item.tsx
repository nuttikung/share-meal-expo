import { PaidBadge } from "@/components/PaidBadge";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAppContext } from "@/context/app/useAppContext";
import { TMember } from "@/types/member";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet } from "react-native";

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  detailContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  summaryContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  paid: {
    textDecorationLine: "line-through",
  },
});

// ----------------------------------------------------------------------

type MemberItemProps = TMember;

// ----------------------------------------------------------------------

function MemberItem(member: MemberItemProps) {
  const { name, paid, id } = member;
  const { onUpdateMember, onRemoveMember } = useAppContext();

  // ----------------------------------------------------------------------

  const handlePaidPress = () => {
    const nextMember = { ...member, paid: !paid };
    onUpdateMember(nextMember);
  };

  const handleDeletePress = () => {
    onRemoveMember(id);
  };

  // ----------------------------------------------------------------------

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.detailContainer}>
        <Pressable onPress={handlePaidPress} style={{ flex: 1 }}>
          <ThemedText style={[paid && styles.paid]}>{name}</ThemedText>
          <PaidBadge paid={!!paid} />
        </Pressable>
        <ThemedView style={styles.summaryContainer}>
          <ThemedText type="subtitle">{paid}</ThemedText>
          <ThemedText type="subtitle">
            <Ionicons size={20} name="list" />
          </ThemedText>
          <Pressable onPress={handleDeletePress}>
            <ThemedText type="subtitle">
              <Ionicons color="red" size={20} name="trash-bin" />
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

export { MemberItem };
