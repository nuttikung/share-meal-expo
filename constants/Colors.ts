/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#ff6900";
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
  inputFontColor: string
  inputBorderColor: string;
  inputPlacholderColor: string;
  // Paid Badge
  paidBadgeBackground: string;
  paidBadgeText: string;
  unPaidBadgeBackground: string;
  unpPidBadgeText: string;

  primary: string;
  secondary: string;
  error: string;
  warning: string;
  info: string;
  // Button
  buttonLabelColor: string;
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
  inputFontColor: "#000",
  inputBorderColor: "#DFE4EA",
  inputPlacholderColor: "#C9CDD1",
  // Paid Badge
  paidBadgeBackground: "#dcfce7",
  paidBadgeText: "#008236",
  unPaidBadgeBackground: "#ffe2e2",
  unpPidBadgeText: "#c10007",
  // ----------------------------------------------------------------------
  primary: "#ff6900",
  secondary: "#00c951",
  error: "#fb2c36",
  warning: "#efb100",
  info: "#00a6f4",
  // Button
  buttonLabelColor: "#FFF",
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
  inputFontColor: "#FFF",
  inputBorderColor: "#FFF",
  inputPlacholderColor: "#FFF",
  // Paid Badge
  paidBadgeBackground: "#0d542b",
  paidBadgeText: "#dcfce7",
  unPaidBadgeBackground: "#c10007",
  unpPidBadgeText: "#ffe2e2",
  // ----------------------------------------------------------------------
  primary: "#ff6900",
  // primary: "#ffd6a8",
  secondary: "#b9f8cf",
  error: "#ffc9c9",
  warning: "#fff085",
  info: "#b8e6fe",
  // Button
  buttonLabelColor: "#FFF",
};

// ----------------------------------------------------------------------

const Colors = {
  light: LIGHT_PALLETE,
  dark: DARK_PALLETE,
};

export { Colors };
