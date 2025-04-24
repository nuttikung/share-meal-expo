import { StyleSheet, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";

// import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/IconSymbol";

// TODO: move to new section
// function OverViewStats() {
//   return (
//     <Grid className="gap-5" _extra={{ className: "grid-cols-8" }}>
//       <GridItem className="p-6 rounded-md" _extra={{ className: "col-span-4" }}>
//         <VStack>
//           <Text size="xl" className="text-gray-500">
//             จำนวนคน
//           </Text>
//           <Text size="4xl" className="text-gray-900">
//             0
//           </Text>
//         </VStack>
//       </GridItem>
//       <GridItem className="p-6 rounded-md" _extra={{ className: "col-span-4" }}>
//         <VStack>
//           <Text size="xl" className="text-gray-500">
//             ราคารวม
//           </Text>
//           <Text size="4xl" className="text-gray-900 truncate">
//             0.00
//           </Text>
//         </VStack>
//       </GridItem>
//     </Grid>
//   );
// }

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
  },
  orderListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

// ----------------------------------------------------------------------

function HomeScreen() {
  const router = useRouter();

  const isEmpty = true;

  // ----------------------------------------------------------------------

  const handlePressEmptyMember = () => {
    router.push("/(modals)/order/order-add");
  };

  // ----------------------------------------------------------------------

  return (
    <ScrollView
      className="bg-white"
      contentContainerStyle={styles.scrollViewContainer}
    >
      {/* {!isEmpty && <OverViewStats />} */}
      <ThemedView style={styles.orderListContainer}>
        <IconSymbol size={110} color="#525252" name="creditcard.fill" />
        <ThemedText size="lg" className="mb-3">
          ยังไม่มีรายการ
        </ThemedText>
        {/* <Button size="xl" onPress={handlePressEmptyMember}>
          <ButtonIcon as={AddIcon} className="mr-2" />
          <ButtonText>เพิ่มรายการ</ButtonText>
        </Button> */}
      </ThemedView>
    </ScrollView>
  );
}

export default HomeScreen;
