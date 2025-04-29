import type { PermissionResponse } from "expo-camera";

type TGetCameraStatusReturn = "loading" | "request-permission" | "allow";

function getCameraStatus(
  permission: PermissionResponse | null,
): TGetCameraStatusReturn {
  if (permission === null) {
    return "loading";
  }

  if (permission.granted !== true) {
    return "request-permission";
  }

  return "allow";
}

export { getCameraStatus };
