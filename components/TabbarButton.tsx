import { ICONS } from "@/constants/Icons";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { PlatformPressable } from "@react-navigation/elements";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});

// ----------------------------------------------------------------------

type TabbarButtonProps = {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  routeName: string;
  label: BottomTabNavigationOptions["tabBarLabel"];
  color: {
    icon: string;
    label: string;
  };
};

// ----------------------------------------------------------------------

function TabbarButton({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}: TabbarButtonProps) {
  const iconColor = color.icon;
  const labelColor = color.label;
  const scale = useSharedValue(0);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scalevalue = interpolate(scale.value, [0, 1], [1, 1.3]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);
    return { transform: [{ scale: scalevalue }], top };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return { opacity };
  });

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 });
  }, [scale, isFocused]);

  return (
    <PlatformPressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
    >
      <Animated.View style={animatedIconStyle}>
        {ICONS[routeName as keyof typeof ICONS]({
          color: iconColor,
        })}
      </Animated.View>
      <Animated.Text style={[{ color: labelColor }, animatedTextStyle]}>
        {/* @ts-expect-error */}
        {label}
      </Animated.Text>
    </PlatformPressable>
  );
}

export { TabbarButton };
