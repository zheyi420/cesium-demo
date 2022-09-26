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
  addOSMBuildings(viewer); // TODO use the function which can detect whether the loading of destination had compeleted.
};

export const destroyDemoQuickStart = (viewer) => {
  // https://cesium.com/learn/cesiumjs/ref-doc/PrimitiveCollection.html#destroyPrimitives
  // Determines if primitives in the collection are destroyed when they are removed by PrimitiveCollection#destroy or PrimitiveCollection#remove or implicitly by PrimitiveCollection#removeAll.
  // Default Value: true
  // viewer.scene.primitives.destroyPrimitives = false;

  const res = viewer.scene.primitives.remove(primitive_buildingTileset);
  if (res) {
    console.log('the primitive was removed.');
  } else {
    console.log('the primitive is undefined or was not found in the collection.');
  }
  console.log('is primitive_buildingTileset destroyed:', primitive_buildingTileset.isDestroyed());
  // https://cesium.com/learn/cesiumjs/ref-doc/Primitive.html#destroy
  // primitive had been destroyed when it was removed by PrimitiveCollection#remove.
  primitive_buildingTileset = undefined;
};
