import Cesium from '../utils/cesium/Cesium';
import shippingTrack from './assets/shippingTrack.json'; // TODO 为什么不能使用 geojson 格式的数据？
// import shippingTrackGCJ02 from './assets/shippingTrack-GCJ02.json';
import {
  addOSMBuildings, removePrimitive, display_Animation_Timeline_Container, hide_Animation_Timeline_Container, adjust_Animation_Timeline_to,
} from '../utils/cesium';

const positionProperty = new Cesium.SampledPositionProperty();

let start;
let stop;

let primitive_fisherBoat;

const loadTrack = (viewer) => {
  const shippingTrackCoords = shippingTrack.features[0].geometry.coordinates;

  viewer.dataSources.add(Cesium.GeoJsonDataSource.load(shippingTrack, {
    clampToGround: true,
  }));

  const timeStepInSeconds = 30;
  const totalSeconds = timeStepInSeconds * (shippingTrackCoords.length - 1);
  start = Cesium.JulianDate.fromIso8601('2023-11-02T08:10:00Z');
  stop = Cesium.JulianDate.addSeconds(start, totalSeconds, new Cesium.JulianDate());
  viewer.clock.startTime = start.clone();
  viewer.clock.stopTime = stop.clone();
  viewer.clock.currentTime = start.clone();
  viewer.timeline.zoomTo(start, stop);
  // viewer.clock.multiplier = 50; // Speed up the playback speed 50x.
  viewer.clock.shouldAnimate = true; // Start playing the scene.

  for (let i = 0; i < shippingTrackCoords.length; i++) {
    const coord = shippingTrackCoords[i];

    // Declare the time for this individual sample and store it in a new JulianDate instance.
    const timestamp = Cesium.JulianDate.addSeconds(start, i * timeStepInSeconds, new Cesium.JulianDate());
    const position = Cesium.Cartesian3.fromDegrees(coord[0], coord[1], 0, Cesium.Ellipsoid.WGS84);

    positionProperty.addSample(timestamp, position);
  }
};

/* const loadTrackGCJ02 = (viewer) => {
  viewer.dataSources.add(Cesium.GeoJsonDataSource.load(shippingTrackGCJ02, {
    clampToGround: true,
    stroke: Cesium.Color.BROWN,
  }));
}; */

const loadShip = (viewer) => {
  // FIXME fix the orientation for Boat.glb OR fix the offset of fisherBoat.glb 那个是模型问题。
  const fisherBoatEntity = viewer.entities.add({
    id: 'fisherBoat',
    name: 'Fisher Boat',
    availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({ start, stop })]),
    position: positionProperty,
    model: {
      uri: `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/Boat.glb`,
      scale: 0.04,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    },
    orientation: new Cesium.VelocityOrientationProperty(positionProperty),
    // path: new Cesium.PathGraphics({ width: 3 }),
  });

  /* viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(...shippingTrack.features[0].geometry.coordinates[0], 1000),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-90),
      roll: 0,
    },
  }); */
  viewer.trackedEntity = fisherBoatEntity;
};

const loadShipPrimitive = async (viewer) => {
  const model_fisherBoat = await Cesium.Model.fromGltfAsync({
    url: `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/fisherBoat.glb`,
    // modelMatrix,
  });
  viewer.scene.primitives.add(model_fisherBoat);
};

export const demoShipping = (viewer) => {
  display_Animation_Timeline_Container(viewer);

  // 1. load track
  loadTrack(viewer);
  // loadTrackGCJ02(viewer);

  // 2. load ship model
  loadShip(viewer);
  // loadShipPrimitive(viewer);

  // 3. run the ship
};

export const destroyShipping = (viewer) => {
  // 1. stop the movement

  // 2. remove the ship

  // 3. remove the track
};
