import Cesium from '../utils/cesium/Cesium';
import trajectory from './assets/trajectorySanFrancisco2Copenhagen.json';
import {
  addOSMBuildings, removePrimitive, display_Animation_Timeline_Container, hide_Animation_Timeline_Container, adjust_Animation_Timeline_toNow,
} from '../utils/cesium/utils';

let primitive_CesiumOSMBuildings;

export const demoFlightTracker = (viewer) => {
  display_Animation_Timeline_Container(viewer);

  /**
   * Fly the camera to the first point.
  viewer.camera.flyTo({
    // https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#flyTo
    destination: Cesium.Cartesian3.fromDegrees(-122.39035, 37.61803, 3),
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-15.0),
    },
  });
  */
  /**
   * because of the code below make the camera track this moving entity.
   * the effect of viewer.camera.lookAt() will be coverd.
  const targetPosition = Cesium.Cartesian3.fromDegrees(-122.39035, 37.61803, -27.32);
  // Using a HeadingPitchRange offset
  // The heading is the angle from y axis and increasing towards the x axis.
  const heading = Cesium.Math.toRadians(-90.0);
  // Pitch is the rotation from the xy-plane. Positive pitch angles are below the plane. Negative pitch angles are above the plane.
  const pitch = Cesium.Math.toRadians(-10.0);
  // The range is the distance from the center.
  const range = 200.0;
  // https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#lookAt
  // viewer.camera.lookAt(targetPosition, new Cesium.Cartesian3(0.0, -4790000.0, 3930000.0));
  viewer.camera.lookAt(targetPosition, new Cesium.HeadingPitchRange(heading, pitch, range));
  */

  primitive_CesiumOSMBuildings = addOSMBuildings(viewer);

  // These are all the radar points from this flight.
  const trajectoryData = JSON.parse(JSON.stringify(trajectory));

  /* Initialize the viewer clock:
    Assume the radar samples are 30 seconds apart, and calculate the entire flight duration based on that assumption.
    Get the start and stop date times of the flight, where the start is the known flight departure time (converted from PST
      to UTC) and the stop is the start plus the calculated duration. (Note that Cesium uses Julian dates. See
      https://simple.wikipedia.org/wiki/Julian_day.)
    Initialize the viewer's clock by setting its start and stop to the flight start and stop times we just calculated.
    Also, set the viewer's current time to the start time and take the user to that time.
  */
  const timeStepInSeconds = 30;
  const totalSeconds = timeStepInSeconds * (trajectoryData.length - 1);
  const start = Cesium.JulianDate.fromIso8601('2020-03-09T23:10:00Z');
  const stop = Cesium.JulianDate.addSeconds(start, totalSeconds, new Cesium.JulianDate());
  console.log('startTime: %o, stopTime: %o', start, stop);
  viewer.clock.startTime = start.clone();
  viewer.clock.stopTime = stop.clone();
  viewer.clock.currentTime = start.clone();
  viewer.timeline.zoomTo(start, stop);
  // Speed up the playback speed 50x.
  // viewer.clock.multiplier = 50;
  // Start playing the scene.
  viewer.clock.shouldAnimate = false;

  // The SampledPositionedProperty stores the position and timestamp for each sample along the radar sample series.
  const positionProperty = new Cesium.SampledPositionProperty();

  // Create a point for each.
  for (let i = 0; i < trajectoryData.length; i++) {
    const dataPoint = trajectoryData[i];

    // Declare the time for this individual sample and store it in a new JulianDate instance.
    const timestamp = Cesium.JulianDate.addSeconds(start, i * timeStepInSeconds, new Cesium.JulianDate());
    const position = Cesium.Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height);
    // Store the position along with its timestamp.
    // TODO Here we add the positions all upfront, but these can be added at run-time as samples are received from a server.
    positionProperty.addSample(timestamp, position);

    // Mark this location with a red point.
    viewer.entities.add({
      description: `Location: (${dataPoint.longitude}, ${dataPoint.latitude}, ${dataPoint.height})`,
      position,
      point: { pixelSize: 5, color: Cesium.Color.RED },
    });
  }

  // airplane entity
  // Create an entity to both visualize the entire radar sample series with a line and add an airplane model that moves along the samples.
  async function loadAirPlaneModel() {
    // Load the glTF model from Cesium ion.
    const airplaneUri = await Cesium.IonResource.fromAssetId(1334695);
    const airplaneEntity = viewer.entities.add({
      availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({ start, stop })]),
      position: positionProperty,
      model: { uri: airplaneUri },
      // Automatically compute the orientation from the position.
      orientation: new Cesium.VelocityOrientationProperty(positionProperty),
      path: new Cesium.PathGraphics({ width: 3 }),
    });
    // Make the camera track this moving entity.
    viewer.trackedEntity = airplaneEntity;
  }

  loadAirPlaneModel();
};

export const destroyDemoFlightTracker = (viewer) => {
  adjust_Animation_Timeline_toNow(viewer);

  // remove all entities.
  viewer.entities.removeAll();

  // remove the Cesium OSM Buildings.
  removePrimitive(viewer, primitive_CesiumOSMBuildings);
  primitive_CesiumOSMBuildings = undefined;

  hide_Animation_Timeline_Container(viewer);
};

/**
 * more info about flight track
 * [Build a Flight Tracker](https://cesium.com/learn/cesiumjs-learn/cesiumjs-flight-tracker/)
 * [Track the World's Commercial Air Traffic with Flightradar24's CesiumJS App](https://cesium.com/blog/2020/08/13/flightradar24/)
 * [How flight tracking works](https://www.flightradar24.com/how-it-works)
 */
