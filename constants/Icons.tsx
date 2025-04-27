import Ionicons from "@expo/vector-icons/Ionicons";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const ICONS = {
  index: (props: any) => <Ionicons name="list" size={24} {...props} />,
  member: (props: any) => <Ionicons name="people" size={24} {...props} />,
} as const;

// ----------------------------------------------------------------------

export { ICONS };
