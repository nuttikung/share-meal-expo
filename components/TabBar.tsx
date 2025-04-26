import { View, StyleSheet, LayoutChangeEvent } from "react-native";
import { useTheme } from "@react-navigation/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TabbarButton } from "./TabbarButton";
import { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginHorizontal: 80,
    paddingVertical: 15,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
  },
  animatedBackground: {
    position: "absolute",
    borderRadius: 30,
    marginHorizontal: 12,
  },
});

// ----------------------------------------------------------------------

type TDimension = { width: number; height: number };

// ----------------------------------------------------------------------

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const [dimension, setDimension] = useState<TDimension>({
    width: 100,
    height: 20,
  });

  const buttonWidth = dimension.width / state.routes.length;
  const tabPositionX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  // ----------------------------------------------------------------------

  // When deep link from any index we need effect here.
  useEffect(() => {
    tabPositionX.value = withSpring(buttonWidth * state.index, {
      duration: 1000,
    });
  }, [state.index]);

  // ----------------------------------------------------------------------

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimension({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  return (
    <View onLayout={onTabbarLayout} style={styles.tabbar}>
      <Animated.View
        style={[
          animatedStyle,
          styles.animatedBackground,
          {
            backgroundColor: colors.primary,
            height: dimension.height - 15,
            width: buttonWidth - 25,
          },
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabbarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={{
              icon: isFocused ? "#FFF" : colors.text,
              label: isFocused ? colors.primary : colors.text,
            }}
            label={label}
          />
        );
      })}
    </View>
  );
}

export { TabBar };

// Back up router link href
// const { buildHref } = useLinkBuilder();
// <PlatformPressable
//   key={route.name}
//   href={buildHref(route.name, route.params)}
//   accessibilityState={isFocused ? { selected: true } : {}}
//   accessibilityLabel={options.tabBarAccessibilityLabel}
//   testID={options.tabBarButtonTestID}
//   onPress={onPress}
//   onLongPress={onLongPress}
//   style={styles.tabbarItem}
// >
// </PlatformPressable>
