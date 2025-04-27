import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

const styles = StyleSheet.create({
  sm: {
    height: 30,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  md: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  lg: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
      ]}
      placeholderTextColor={placholderColor}
      {...otherProps}
    />
  );
}

export { ThemeTextInput };
