import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { StyleSheet } from "react-native";

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
});

// ----------------------------------------------------------------------

type PaidBadge = {
  paid: boolean;
};

// ----------------------------------------------------------------------

function PaidBadge({ paid }: PaidBadge) {
  const color = useThemeColor({}, paid ? "paidBadgeText" : "unpPidBadgeText");
  const backgroundColor = useThemeColor(
    {},
    paid ? "paidBadgeBackground" : "unPaidBadgeBackground",
  );
  const text = paid ? "จ่ายแล้ว" : "ยังไม่จ่าย";

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={[styles.text, { backgroundColor, color }]}>
        {text}
      </ThemedText>
    </ThemedView>
  );
}

export { PaidBadge };
