import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    // backgroundColor: "white",
  },
  scrollViewContainer: {
    flex: 1,
  },
  // orderListContainer: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});

// ----------------------------------------------------------------------

function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <ThemedView>
          <ThemedText>Home Screen</ThemedText>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
