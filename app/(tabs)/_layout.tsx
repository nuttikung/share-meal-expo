import { Tabs } from "expo-router";
import React, { ComponentProps } from "react";
import { Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

// ----------------------------------------------------------------------

type TabBarIconProps = {
  name: ComponentProps<typeof Ionicons>["name"];
  color: string;
};

function TabBarIcon({ name, color }: TabBarIconProps) {
  return (
    <Ionicons
      size={28}
      style={{ marginBottom: -3 }}
      name={name}
      color={color}
    />
  );
}

// ----------------------------------------------------------------------

function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          // Use a transparent background on iOS to show the blur effect
          // ios: { position: "absolute" },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "รายการอาหาร",
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="member"
        options={{
          title: "รายชื่อคนจ่าย",
          tabBarIcon: ({ color }) => <TabBarIcon name="people" color={color} />,
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
