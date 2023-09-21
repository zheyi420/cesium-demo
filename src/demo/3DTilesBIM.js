import Cesium from '../utils/cesium/Cesium';
import {
  display_Animation_Timeline_Container, hide_Animation_Timeline_Container, adjust_Animation_Timeline_to, removePrimitive,
} from '../utils/cesium';
import { ConsoleLog } from '../utils';

let tileset;
let handler;
let selectedFeature;
let picking = false;

// In this tileset every feature has an "element" property which is a global ID.
// This property is used to associate features across different tiles and LODs.
// Workaround until 3D Tiles has the concept of global batch ids: https://github.com/CesiumGS/3d-tiles/issues/265
const elementMap = {}; // Build a map of elements to features.
const hiddenElements = [112001, 113180, 131136, 113167, 71309, 109652, 111178, 113156, 113170, 124846, 114076, 131122, 113179, 114325, 131134, 113164, 113153, 113179, 109656, 114095, 114093, 39225, 39267, 113149, 113071, 112003, 39229, 113160, 39227, 39234, 113985, 39230, 112004, 39223];

const setElementColor = (element, color) => {
  const featuresToColor = elementMap[element];
  const { length } = featuresToColor;
  // console.log('featuresToColor:', featuresToColor); // [Cesium3DTileFeature, Cesium3DTileFeature, ...]
  for (let i = 0; i < length; ++i) {
    const feature = featuresToColor[i];
    feature.color = Cesium.Color.clone(color, feature.color); // FIXME Model3DTileContent.js:113 Uncaught TypeError: Cannot read properties of undefined (reading 'featureTables')
  }
};

const selectFeature = (feature) => {
  const element = feature.getProperty('element');
  setElementColor(element, Cesium.Color.YELLOW); // FIXME Model3DTileContent.js:113 Uncaught TypeError: Cannot read properties of undefined (reading 'featureTables')
  selectedFeature = feature;
};

const unselectFeature = (feature) => {
  if (!Cesium.defined(feature)) {
    return;
  }
  const element = feature.getProperty('element');
  setElementColor(element, Cesium.Color.WHITE);
  if (feature === selectedFeature) {
    selectedFeature = undefined;
  }
};

const getElement = (feature) => parseInt(feature.getProperty('element'), 10);

const unloadFeature = (feature) => {
  unselectFeature(feature);
  const element = getElement(feature);
  const features = elementMap[element];
  const index = features.indexOf(feature);
  if (index > -1) {
    features.splice(index, 1);
  }
};

const loadFeature = (feature) => {
  const element = getElement(feature);
  let features = elementMap[element];
  if (!Cesium.defined(features)) {
    features = [];
    elementMap[element] = features;
  }
  features.push(feature);

  if (hiddenElements.indexOf(element) > -1) {
    feature.show = false;
  }
};

const processContentFeatures = (content, callback) => {
  const { featuresLength } = content;
  for (let i = 0; i < featuresLength; ++i) {
    const feature = content.getFeature(i);
    callback(feature);
  }
};

const processTileFeatures = (tile, callback) => {
  const { content } = tile;
  const { innerContents } = content;
  if (Cesium.defined(innerContents)) {
    const { length } = innerContents;
    for (let i = 0; i < length; ++i) {
      processContentFeatures(innerContents[i], callback);
    }
  } else {
    processContentFeatures(content, callback);
  }
};

export const toggleFeatureShow = (checked) => {
  picking = checked;
  if (!picking) {
    console.log('selectedFeature:', selectedFeature);
    console.log('Cesium.defined(selectedFeature):', Cesium.defined(selectedFeature));
    unselectFeature(selectedFeature);
  }
};

export const demo3DTilesBIM = async (viewer) => {
  display_Animation_Timeline_Container(viewer);
  adjust_Animation_Timeline_to(viewer, Cesium.JulianDate.fromIso8601('2022-08-01T00:00:00Z'));

  /*
  // deprecated
  tileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
      url: `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/3DTiles/PowerPlant/tileset.json`,
    }),
  );
  */

  try {
    tileset = await Cesium.Cesium3DTileset.fromUrl(
      `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/3DTiles/PowerPlant/tileset.json`,
    );
    viewer.scene.primitives.add(tileset);

    viewer.zoomTo(
      tileset,
      new Cesium.HeadingPitchRange(0.5, -0.2, tileset.boundingSphere.radius * 4.0),
    );

    tileset.colorBlendMode = Cesium.Cesium3DTileColorBlendMode.REPLACE;

    tileset.tileLoad.addEventListener((tile) => {
      console.log('A tile was loaded.');
      processTileFeatures(tile, loadFeature);
    });

    tileset.tileUnload.addEventListener((tile) => {
      console.log('A tile was unloaded from the cache.');
      processTileFeatures(tile, unloadFeature);
    });

  } catch (error) {
    console.error(`Error creating tileset: ${error}`);
  }



  handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction((movement) => {
    if (!picking) {
      return;
    }

    const feature = viewer.scene.pick(movement.endPosition);

    unselectFeature(selectedFeature);

    if (feature instanceof Cesium.Cesium3DTileFeature) {
      selectFeature(feature); // FIXME Model3DTileContent.js:113 Uncaught TypeError: Cannot read properties of undefined (reading 'featureTables')
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

};

export const destroyDemo3DTilesBIM = (viewer) => {
  toggleFeatureShow(false);

  // handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  handler = handler && handler.destroy(); // assign the return value (undefined) to the object

  // tileset.tileload.removeEventListener();
  // tileset.tileUnload.removeEventListener();

  removePrimitive(viewer, tileset);
  tileset = undefined;

  adjust_Animation_Timeline_to(viewer, 'NOW');
  hide_Animation_Timeline_Container(viewer);
};
