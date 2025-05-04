import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

const styles = StyleSheet.create({
  sm: {
    height: 30,
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  md: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  lg: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 5,
  },
});

// ----------------------------------------------------------------------

type ThemeTextInputProps = TextInputProps & {
  size?: "sm" | "md" | "lg";
  lightColor?: string;
  darkColor?: string;
};

// ----------------------------------------------------------------------

function ThemeTextInput({
  size = "md",
  lightColor,
  darkColor,
  style,
  ...otherProps
}: ThemeTextInputProps) {
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "inputBorderColor",
  );
  const placholderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "inputPlacholderColor",
  );

  return (
    <TextInput
      style={[
        { borderColor },
        size === "sm" ? styles.sm : undefined,
        size === "md" ? styles.md : undefined,
        size === "lg" ? styles.lg : undefined,
        style,
      ]}
      placeholderTextColor={placholderColor}
      {...otherProps}
    />
  );
}

export { ThemeTextInput };
