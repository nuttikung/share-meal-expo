import Ionicons from "@expo/vector-icons/Ionicons";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const ICONS = {
  index: (props: any) => <Ionicons name="list" size={24} {...props} />,
  home: (props: any) => <Ionicons name="home" size={24} {...props} />,
  explore: (props: any) => <Ionicons name="globe" size={24} {...props} />,
} as const;

// ----------------------------------------------------------------------

export { ICONS };
