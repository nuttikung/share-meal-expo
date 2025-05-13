import {
  StyleSheet,
  ScrollView,
  Pressable,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { isNumeric } from "voca";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { OverallStat } from "@/sections/overall-stat";
import { ThemeTextInput } from "@/components/ThemeTextInput";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useCamera } from "@/hooks/useCamera";
import { getCameraStatus } from "@/utils/camera";
import { useRef, useState } from "react";
import { TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ThemeButton } from "@/components/ThemeButton";
import OcrModule from "@/modules/ocr-module";

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
  const nameRef = useRef<TextInput>(null);
  const priceRef = useRef<TextInput>(null);

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const backgroundColor = useThemeColor({}, "background");

  const { permission, requestPermission } = useCamera();

  // ----------------------------------------------------------------------

  const handleNameChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const value = e.nativeEvent.text;
    setName(value);
  };

  const handlePriceChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const value = e.nativeEvent.text;
    setPrice(value);
  };

  const handleNameSubmit = () => {
    priceRef.current?.focus();
  };

  // ----------------------------------------------------------------------

  // Camera status
  const cameraPermission = getCameraStatus(permission);
  console.log(cameraPermission);

  return (
    <ScrollView
      className="bg-white"
      contentInsetAdjustmentBehavior="automatic"
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
            ref={nameRef}
            value={name}
            returnKeyType="next"
            placeholder="เช่น บุฟเฟ่ต์, หมูกระทะ, ชาเขียว, เบียร์ (โปร)"
            onChange={handleNameChange}
            onSubmitEditing={handleNameSubmit}
          />
          <ThemedText type="subtitle" style={styles.label}>
            ราคา
          </ThemedText>
          <ThemeTextInput
            ref={priceRef}
            value={price}
            onChange={handlePriceChange}
            style={styles.input}
            returnKeyType="done"
            keyboardType="numeric"
            placeholder="เช่น 99, 100, 345, 500"
            submitBehavior="blurAndSubmit"
          />
          <Pressable onPress={requestPermission}>
            <ThemedText type="subtitle" style={styles.label}>
              render member selection view
            </ThemedText>
          </Pressable>
          <UploadImage />
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

function UploadImage() {
  const [image, setImage] = useState<string | null>(null);
  const [pickableOrder, setPickableOrder] = useState<Array<string>>([]);
  const [pickablePrice, setPickablePrice] = useState<Array<string>>([]);

  const handlePickImage = async () => {
    const orderList = new Set<string>();
    const priceList = new Set<string>();

    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const recognizeText = await OcrModule.recognizeTextAsync(
        result.assets[0].uri,
      );

      const possibilitiesText = recognizeText.split("\n");
      if (possibilitiesText.length > 0) {
        for (let i = 0, len = possibilitiesText.length; i < len; i++) {
          const element = possibilitiesText[i];
          if (isNumeric(element)) {
            priceList.add(element);
          } else {
            orderList.add(element);
          }
        }
      }

      setPickableOrder(Array.from(orderList));
      setPickablePrice(Array.from(priceList));
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ThemedView>
      <ThemeButton label="Pick from photo" onPress={handlePickImage} />
      <ThemedView>
        {pickableOrder.length > 0 &&
          pickableOrder.map((text) => (
            <ThemedText key={text}>{text}</ThemedText>
          ))}
      </ThemedView>
      {/* <ThemedView>
        {pickablePrice.length > 0 &&
          pickablePrice.map((text) => (
            <ThemedText key={text}>{text}</ThemedText>
          ))}
      </ThemedView> */}
    </ThemedView>
  );
}

export default OrderScreen;
