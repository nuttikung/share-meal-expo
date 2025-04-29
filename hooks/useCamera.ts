import { useState } from "react";
import { CameraType, useCameraPermissions } from "expo-camera";

function useCamera() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const onToggleCamera = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  return {
    facing,
    onToggleCamera,
    permission,
    requestPermission,
  } as const;
}

export { useCamera };
