import {
  Pressable,
  type PressableProps,
  type TextProps,
  StyleSheet,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { ReactNode } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
    borderRadius: 5,
  },
  text: {
    textAlign: "center",
  },
});

// ----------------------------------------------------------------------

type ThemeButtonProps = Omit<PressableProps, "style"> & {
  type?: "outline" | "contained";
  containerStyle?: PressableProps["style"];
  textStyle?: TextProps["style"];
  label: string | ReactNode;
};

// ----------------------------------------------------------------------

function ThemeButton(props: ThemeButtonProps) {
  const {
    type = "contained",
    containerStyle,
    textStyle,
    label,
    ...rest
  } = props;

  console.log(containerStyle);

  const backgroundColor = useThemeColor({}, "primary");
  const color = useThemeColor({}, "buttonLabelColor");

  return (
    <Pressable {...rest} style={[styles.container, { backgroundColor }]}>
      <ThemedText style={[styles.text, { color }, textStyle]}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

export { ThemeButton };
