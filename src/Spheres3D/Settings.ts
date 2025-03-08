export const SETTINGS = {
  sphereGen: {
    num: 250,
    sphereProps: [1, 11, 5],
    zMinMax: [150, 400],
  },
  sphereAnim: {
    colourDamp: 0.2,
    colourLerp: 0.1,
    colourThresh: 10,
    rotateFactor: 0.015,
  },
  sphereMove: {
    mass: 5,
    zAccel: 0.02,
    friction: 1,
    maxDeltaZ: 0.15,
    minDeltaV: 0.0001,
  },
  sphereReset: {
    proxThresh: 100,
    zMin: -1,
    zMinMax: [250, 400],
  },
  camera: {
    fov: 45,
    position: [0, 0, 0],
    far: 500,
  },
  cursorSpot: {
    colour: 0xffffff,
    intensity: 7500,
    angle: 0.3,
    penumbra: 0.8,
    decay: 1.85,
    distance: 0,
  },
  directLights: {
    intensity: 1,
  },
} as const;
