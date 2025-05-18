import { useThemeColor } from "@/hooks/useThemeColor";
import { forwardRef } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  TextInputProps,
} from "react-native";

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

type ThemeTextInputProps = Omit<TextInputProps, "onChange"> & {
  size?: "sm" | "md" | "lg";
  type?: "text" | "number";
  lightColor?: string;
  darkColor?: string;
  onChange?: (
    e: NativeSyntheticEvent<TextInputChangeEventData> & {
      rawValue: number | string;
    },
  ) => void | undefined;
};

// ----------------------------------------------------------------------

const ThemeTextInput = forwardRef<TextInput, ThemeTextInputProps>(
  (
    {
      size = "md",
      type = "text",
      lightColor,
      darkColor,
      style,
      onChange = () => {},
      value = "",
      ...otherProps
    },
    ref,
  ) => {
    const formatValue = type === "number" && value === "0" ? "" : value;

    const color = useThemeColor(
      { light: lightColor, dark: darkColor },
      "inputFontColor",
    );
    const borderColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "inputBorderColor",
    );
    const placholderColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "inputPlacholderColor",
    );

    const handleChange = (
      e: NativeSyntheticEvent<TextInputChangeEventData>,
    ) => {
      if (type === "number") {
        onChange(
          Object.assign(e, {
            rawValue: Number(e.nativeEvent.text),
          }),
        );
        return;
      }

      onChange(
        Object.assign(e, {
          rawValue: e.nativeEvent.text,
        }),
      );
    };

    return (
      <TextInput
        ref={ref}
        style={[
          { borderColor, color },
          size === "sm" ? styles.sm : undefined,
          size === "md" ? styles.md : undefined,
          size === "lg" ? styles.lg : undefined,
          style,
        ]}
        placeholderTextColor={placholderColor}
        {...otherProps}
        value={formatValue}
        onChange={handleChange}
      />
    );
  },
);

export { ThemeTextInput };
