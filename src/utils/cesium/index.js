import { ConsoleLog } from '..';
import Cesium from './Cesium';

/**
 * Add Cesium OSM Buildings, a global 3D buildings layer.
 * @param {Viewer} viewer - Cesium.Viewer
 * @returns {Primitive} The primitive added to the collection.
 */
export const addOSMBuildings = (viewer) => {
  const primitive_CesiumOsmBuildings = viewer.scene.primitives.add(
    Cesium.createOsmBuildings({
      style: new Cesium.Cesium3DTileStyle({
        /* color: {
          conditions: [
            // eslint-disable-next-line no-template-curly-in-string
            ["${feature['building']} === 'hospital'", "color('#0000FF')"],
            // eslint-disable-next-line no-template-curly-in-string
            ["${feature['building']} === 'school'", "color('#00FF00')"],
            [true, "color('#ffffff')"],
          ],
        }, */
        // For any building that has a `cesium#color` property, use that color, otherwise make it white.
        color: "Boolean(${feature['cesium#color']}) ? color(${feature['cesium#color']}) : color('#ffffff')", // eslint-disable-line no-template-curly-in-string
      }),
    }),
  );

  return primitive_CesiumOsmBuildings;
};

/**
 * Removes a primitive from the collection.
 * Recommend assign primitive undefined after remove.
 * @param {Viewer} viewer - Cesium.Viewer
 * @param {Primitive} primitive - The primitive to remove.
 * @returns {Boolean} Is primitive destroyed.
 */
export const removePrimitive = (viewer, primitive) => {
  // https://cesium.com/learn/cesiumjs/ref-doc/PrimitiveCollection.html#destroyPrimitives
  // Determines if primitives in the collection are destroyed when they are removed by PrimitiveCollection#destroy or PrimitiveCollection#remove or implicitly by PrimitiveCollection#removeAll.
  // viewer.scene.primitives.destroyPrimitives = true; // Default Value: true

  const res = viewer.scene.primitives.remove(primitive);
  if (res) {
    ConsoleLog('the primitive was removed.');
  } else {
    ConsoleLog('the primitive is undefined or was not found in the collection.');
  }

  // https://cesium.com/learn/cesiumjs/ref-doc/Primitive.html#destroy
  // primitive had been destroyed when it was removed by PrimitiveCollection#remove.
  return primitive.isDestroyed();
};

/**
 * Display the container of Animation and Timeline.
 * @param {Viewer} viewer
 */
export const display_Animation_Timeline_Container = (viewer) => {
  viewer.animation.container.style.visibility = 'visible';
  viewer.timeline.container.style.visibility = 'visible';
};

/**
 * Hide the container of Animation and Timeline.
 * @param {Viewer} viewer
 */
export const hide_Animation_Timeline_Container = (viewer) => {
  viewer.animation.container.style.visibility = 'hidden';
  viewer.timeline.container.style.visibility = 'hidden';
};

/**
 * Adjust clock to Now, timeline to the nearby time.
 * Pause the clock, set multiplier to 1.
 * @param {Viewer} viewer
 */
export const adjust_Animation_Timeline_toNow = (viewer) => {
  viewer.clock.multiplier = 1;
  viewer.clock.shouldAnimate = false;

  const curJulianDate = Cesium.JulianDate.now();
  viewer.clock.currentTime = curJulianDate;
  const startTime = Cesium.JulianDate.addDays(curJulianDate, -1, new Cesium.JulianDate());
  const stopTime = Cesium.JulianDate.addDays(curJulianDate, 1, new Cesium.JulianDate());
  viewer.timeline.zoomTo(startTime, stopTime);
};

/**
 * Correct orientation of the camera.
 * @param {Viewer} viewer
 */
export const correct_camera_orientation = (viewer) => {
  // TODO
};
