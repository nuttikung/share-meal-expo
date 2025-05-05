import { StyleSheet, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { OverallStat } from "@/sections/overall-stat";
import { ThemeTextInput } from "@/components/ThemeTextInput";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useCamera } from "@/hooks/useCamera";
import { getCameraStatus } from "@/utils/camera";

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
  },
  orderListContainer: {
    alignItems: "center",
    margin: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderStyle: "dashed",
  },
  orderForm: {
    flex: 1,
  },
  label: {
    marginVertical: 3,
    marginHorizontal: 12,
  },
  input: {
    margin: 10,
  },
});

// ----------------------------------------------------------------------

function OrderScreen() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, "background");

  const { permission, requestPermission } = useCamera();

  // Camera status
  const cameraPermission = getCameraStatus(permission);
  console.log(cameraPermission);

  return (
    <ScrollView
      className="bg-white"
      contentContainerStyle={[{ backgroundColor }, styles.scrollViewContainer]}
    >
      <SafeAreaView style={styles.safeAreaContainer}>
        <OverallStat />
        <EmptyStat />
        <ThemedView style={styles.orderForm}>
          <ThemedText type="subtitle" style={styles.label}>
            ชื่อรายการ
          </ThemedText>
          <ThemeTextInput
            style={styles.input}
            placeholder="เช่น บุฟเฟ่ต์, หมูกระทะ, ชาเขียว, เบียร์ (โปร)"
          />
          <ThemedText type="subtitle" style={styles.label}>
            ราคา
          </ThemedText>
          <ThemeTextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="เช่น 99, 100, 345, 500"
          />
          <Pressable onPress={requestPermission}>
            <ThemedText type="subtitle" style={styles.label}>
              icon camera
            </ThemedText>
          </Pressable>
        </ThemedView>
      </SafeAreaView>
    </ScrollView>
  );
}

function EmptyStat() {
  const iconColor = useThemeColor({}, "icon");
  const borderColor = useThemeColor({}, "inputPlacholderColor");

  return (
    <ThemedView style={[{ borderColor }, styles.orderListContainer]}>
      <MaterialIcons size={110} color={iconColor} name="payments" />
      <ThemedText type="subtitle">ยังไม่มีรายการ</ThemedText>
    </ThemedView>
  );
}

export default OrderScreen;
