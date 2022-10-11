import Cesium from '../utils/cesium/Cesium';
import { addOSMBuildings, removePrimitive } from '../utils/cesium/utils';

let primitive_CesiumOSMBuildings;

const flyTo = (viewer) => {
  // Fly the camera to San Francisco at the given longitude, latitude, and height.
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-15.0),
    },
  });
};

export const demoQuickStart = (viewer) => {
  flyTo(viewer);
  // TODO use the function which can detect whether the loading of terrain at destination had compeleted before add OSMBuildings.
  primitive_CesiumOSMBuildings = addOSMBuildings(viewer);

  console.log('primitive_CesiumOSMBuildings - after created:', primitive_CesiumOSMBuildings);
};

export const destroyDemoQuickStart = (viewer) => {
  const res = removePrimitive(viewer, primitive_CesiumOSMBuildings);
  console.log('is primitive destroyed:', res);
  console.log('primitive_CesiumOSMBuildings - after destroyed:', primitive_CesiumOSMBuildings);
  primitive_CesiumOSMBuildings = undefined;
};
