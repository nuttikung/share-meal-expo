/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

// ----------------------------------------------------------------------

type TColor = {
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabContainerBackground: string;
  tabIconDefault: string;
  tabIconSelected: string;
  divider: string;
  // Input
  inputBorderColor: string;
  inputPlacholderColor: string;
  // Paid Badge
  paidBadgeBackground: string;
  paidBadgeText: string;
  unPaidBadgeBackground: string;
  unpPidBadgeText: string;
};

// ----------------------------------------------------------------------

const LIGHT_PALLETE: TColor = {
  text: "#11181C",
  background: "#fff",
  tint: tintColorLight,
  icon: "#687076",
  // ----------------------------------------------------------------------
  tabContainerBackground: "#fff",
  tabIconDefault: "#687076",
  tabIconSelected: "#fff",
  // tabIconSelected: tintColorLight,
  // ----------------------------------------------------------------------
  divider: "#DFE4EA",
  // Input
  inputBorderColor: "#DFE4EA",
  inputPlacholderColor: "#C9CDD1",
  // Paid Badge
  paidBadgeBackground: "#dcfce7",
  paidBadgeText: "#008236",
  unPaidBadgeBackground: "#ffe2e2",
  unpPidBadgeText: "#c10007",
};

const DARK_PALLETE: TColor = {
  text: "#ECEDEE",
  background: "#151718",
  tint: tintColorDark,
  icon: "#9BA1A6",
  // ----------------------------------------------------------------------
  tabContainerBackground: "#22272B",
  tabIconDefault: "#DEE4EA",
  // tabIconDefault: "#9BA1A6",
  tabIconSelected: tintColorDark,
  // ----------------------------------------------------------------------
  // TODO: change divider for dark theme
  divider: "#FFF",
  inputBorderColor: "#FFF",
  inputPlacholderColor: "#FFF",
  // Paid Badge
  paidBadgeBackground: "#0d542b",
  paidBadgeText: "#dcfce7",
  unPaidBadgeBackground: "#c10007",
  unpPidBadgeText: "#ffe2e2",
};

// ----------------------------------------------------------------------

const Colors = {
  light: LIGHT_PALLETE,
  dark: DARK_PALLETE,
};

export { Colors };
