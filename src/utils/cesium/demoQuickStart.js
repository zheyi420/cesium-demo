import Cesium from './Cesium';

let primitive_buildingTileset;

const addOSMBuildings = (viewer) => {
  // Add Cesium OSM Buildings, a global 3D buildings layer.
  // Returns: The primitive added to the collection.
  primitive_buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings({
    style: new Cesium.Cesium3DTileStyle({
      color: {
        conditions: [
          // eslint-disable-next-line no-template-curly-in-string
          ["${feature['building']} === 'hospital'", "color('#0000FF')"],
          // eslint-disable-next-line no-template-curly-in-string
          ["${feature['building']} === 'school'", "color('#00FF00')"],
          [true, "color('#ffffff')"],
        ],
      },
    }),
  }));

  console.log('primitive_buildingTileset:', primitive_buildingTileset);
};

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
  setTimeout(() => { // TODO change to using the function which can detect whether the loading compeleted.
    addOSMBuildings(viewer);
  }, 20 * 1000);
};

export const destroyDemoQuickStart = (viewer) => {
  const res = viewer.scene.primitives.remove(primitive_buildingTileset);
  if (res) {
    console.log('the primitive was removed.');
  } else {
    console.log('the primitive is undefined or was not found in the collection.');
  }
};
