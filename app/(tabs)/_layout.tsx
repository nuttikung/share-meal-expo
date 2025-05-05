import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TabBar } from "@/components/TabBar";

function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
      // screenOptions={{
      //   tabBarShowLabel: false,
      //   tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      //   headerShown: false,
      //   tabBarButton: HapticTab,
      //   // tabBarBackground: TabBarBackground,
      //   tabBarStyle: Platform.select({
      //     ios: {
      //       // Use a transparent background on iOS to show the blur effect
      //       position: "absolute",
      //     },
      //     default: {},
      //   }),
      //   // tabBarIcon: ({ focused }): React.ReactElement => TabBarIcon(focused),
      // }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "รายการอาหาร",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="list" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="member"
        options={{
          title: "รายชื่อคนจ่าย",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="people" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
