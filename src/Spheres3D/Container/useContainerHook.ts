import { RootState, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group, PerspectiveCamera } from "three";
import { initVectorHelpers, resetCamera } from "../Helpers/Vector3Helpers";

export function useContainerHook() {
  const state = useThree<RootState & { camera: PerspectiveCamera }>();

  // to reference group during raycast
  const groupRef = useRef<Group>(null);

  // initialise & maintain frustum
  initVectorHelpers(state.camera);
  useEffect(() => {
    // reset camera used for calculations on camera/viewport change
    initVectorHelpers(state.camera);

    // unset camera on dismount
    return () => {
      resetCamera();
    };
  }, [state.camera, state.viewport]);

  return [state.raycaster, groupRef] as const;
}
