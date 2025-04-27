import { ThemeDivider } from "@/components/ThemeDivider";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  item: {
    flex: 1,
    alignItems: "flex-end",
    marginHorizontal: 10,
    padding: 10,
    gap: 10,
  },
});

// ----------------------------------------------------------------------

function OverallStat() {
  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.item}>
          <ThemedText>จำนวนคน</ThemedText>
          <ThemedText type="title">0.00</ThemedText>
        </ThemedView>
        <ThemeDivider orientation="vertical" />
        <ThemedView style={styles.item}>
          <ThemedText>ราคารวม</ThemedText>
          <ThemedText type="title">0.00</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemeDivider />
    </>
  );
}

export { OverallStat };
