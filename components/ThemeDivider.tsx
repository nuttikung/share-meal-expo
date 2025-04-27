import { View, type ViewProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

// ----------------------------------------------------------------------

type ThemeDividerProps = ViewProps & {
  width?: number;
  orientation?: "horizontal" | "vertical";
  lightColor?: string;
  darkColor?: string;
};

// ----------------------------------------------------------------------

function ThemeDivider({
  style,
  width = 1,
  orientation = "horizontal",
  lightColor,
  darkColor,
  ...otherProps
}: ThemeDividerProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "divider",
  );

  return (
    <View
      style={[
        { width: orientation === "horizontal" ? "100%" : width },
        { height: orientation === "vertical" ? "100%" : width },
        { backgroundColor: color },
        style,
      ]}
      {...otherProps}
    />
  );
}

export { ThemeDivider };
