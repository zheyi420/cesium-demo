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

/**
 * Cesium.EntityCollection.CollectionChangedEventCallback(collection, added, removed, changed)
 * https://cesium.com/learn/cesiumjs/ref-doc/EntityCollection.html#.CollectionChangedEventCallback
 * @param {*} collection
 * @param {*} added
 * @param {*} removed
 * @param {*} changed
 */
export const onChanged = (collection, added, removed, changed) => {
  const hasAdded = added.length > 0;
  const hasRemoved = removed.length > 0;
  const hasChanged = changed.length > 0;

  if (hasAdded) {
    let msgAdded = 'Added ids';
    for (let i = 0; i < added.length; i++) {
      msgAdded += `\n${i + 1}: ${added[i].id} - ${added[i].name}`;
    }
    ConsoleLog(msgAdded);
  }

  if (hasRemoved) {
    let msgRemoved = 'Removed ids';
    for (let i = 0; i < removed.length; i++) {
      msgRemoved += `\n${i + 1}: ${removed[i].id}`;
    }
    ConsoleLog(msgRemoved);
  }

  /* TODO has too much changes while animating label
  if (hasChanged) {
    let msgChanged = 'Changed ids';
    for (let i = 0; i < changed.length; i++) {
      msgChanged += `\n${i + 1}: ${changed[i].id}`;
    }
    ConsoleLog(msgChanged);
  } */
};

/**
 * Add entities to the collection.
 */
export const addEntities = (viewer, collection) => {
  for (const key in collection) {
    if (Object.prototype.hasOwnProperty.call(collection, key)) {
      viewer.entities.add(collection[key]);
    }
  }
};

/**
 * computue the coordinate of 7 outer vertex and 7 inner vertex.
 * @param {Number} arms - the number of outer vertex.
 * @param {Number} rOuter - the radius of the outer vertex.
 * @param {Number} rInner - the radius of the inner vertex.
 * @returns {Array}
 */
export const computeStar = (arms, rOuter, rInner) => {
  const angle = Math.PI / arms;
  const length = 2 * arms;
  const positions = new Array(length);
  for (let i = 0; i < length; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    positions[i] = new Cesium.Cartesian2(
      Math.cos(i * angle) * r,
      Math.sin(i * angle) * r,
    );
  }
  return positions;
};

export const computeCircle = (radius) => {
  const positions = [];
  for (let i = 0; i < 360; i++) {
    const radians = Cesium.Math.toRadians(i);
    positions.push(
      new Cesium.Cartesian2(
        radius * Math.cos(radians),
        radius * Math.sin(radians),
      ),
    );
  }
  return positions;
};

let rotation = Cesium.Math.toRadians(30);

export const getRotationValue = () => {
  rotation += 0.005;
  return rotation;
};

/**
 * Returns the top-most entity at the provided window coordinates
 * or undefined if no entity is at that location.
 *
 * @param {Cartesian2} windowPosition The window coordinates.
 * @returns {Entity} The picked entity or undefined.
 */
export const pickEntity = (viewer, windowPosition) => {
  const picked = viewer.scene.pick(windowPosition);
  if (Cesium.defined(picked)) {
    const id = Cesium.defaultValue(picked.id, picked.primitive.id);
    if (id instanceof Cesium.Entity) { // TODO ??? does it work???
      return id;
    }
  }
  return undefined;
};

/**
 * Returns the list of entities at the provided window coordinates.
 * The entities are sorted front to back by their visual order.
 *
 * @param {Cartesian2} windowPosition The window coordinates.
 * @returns {Entity[]} The picked entities or undefined.
 */
export const drillPickEntities = (viewer, windowPosition) => {
  let i;
  let entity; // temp using
  let picked; // temp using
  const pickedPrimitives = viewer.scene.drillPick(windowPosition);
  const { length } = pickedPrimitives;
  const result = [];
  const hash = {};

  for (i = 0; i < length; i++) {
    picked = pickedPrimitives[i];
    entity = Cesium.defaultValue(picked.id, picked.primitive.id);
    if (entity instanceof Cesium.Entity && !Cesium.defined(hash[entity.id])) {
      result.push(entity);
      hash[entity.id] = true;
    }
  }
  return result;
};

/**
 *
 * @param {*} viewer
 * @param {*} entity
 * @returns A function that will remove this event listener when invoked.
 */
export const animateLabel = (viewer, entity) => {
  let outlineDelta = 0.1;
  let fontDelta = -1.0;
  let fontSize = 20.0;
  const minFontSize = 1.0;
  const maxFontSize = 48.0;

  const labelListenerCallback = viewer.scene.preUpdate.addEventListener((scene, time) => {
    entity.label.outlineWidth += outlineDelta;
    if (
      entity.label.outlineWidth >= 4.0
        || entity.label.outlineWidth <= 0.0
    ) {
      outlineDelta *= -1.0;
    }

    fontSize += fontDelta;
    if (fontSize >= maxFontSize || fontSize <= minFontSize) {
      fontDelta *= -1.0;
    }
    entity.label.font = `${fontSize}px Calibri`;
  });

  return labelListenerCallback;
};
