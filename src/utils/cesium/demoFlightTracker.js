import Cesium from './Cesium';
import trajectory from './assets/trajectorySanFrancisco2Copenhagen.json';

const display_Animation_Timeline_Container = (viewer) => {
  viewer.animation.container.style.visibility = 'visible';
  viewer.timeline.container.style.visibility = 'visible';
};

const hide_Animation_Timeline_Container = (viewer) => {
  viewer.animation.container.style.visibility = 'hidden';
  viewer.timeline.container.style.visibility = 'hidden';
};

export const demoFlightTracker = (viewer) => {
  display_Animation_Timeline_Container(viewer);

  // Fly the camera to the first point.
  viewer.camera.flyTo({ // TODO sometimes the camera is not face the airplane entity directly.
    // https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#flyTo
    destination: Cesium.Cartesian3.fromDegrees(-122.39035, 37.61803, 0),
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-15.0),
    },
  });

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
    // Here we add the positions all upfront, but these can be added at run-time as samples are received from a server.
    positionProperty.addSample(timestamp, position);

    // Mark this location with a red point.
    viewer.entities.add({
      description: `Location: (${dataPoint.longitude}, ${dataPoint.latitude}, ${dataPoint.height})`,
      position,
      point: { pixelSize: 5, color: Cesium.Color.RED },
    });
  }

  // green circle entity
  // Create an entity to both visualize the entire radar sample series with a line and add a point that moves along the samples.
  function addGreenCircleEntity() {
    const airplaneEntity = viewer.entities.add({
      availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({ start, stop })]),
      position: positionProperty,
      point: { pixelSize: 30, color: Cesium.Color.GREEN },
      path: new Cesium.PathGraphics({ width: 3 }),
    });
    // Make the camera track this moving entity.
    viewer.trackedEntity = airplaneEntity;
  }

  // addGreenCircleEntity();

  // airplane entity
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

    viewer.trackedEntity = airplaneEntity;
  }

  loadAirPlaneModel();

  /* TODO when the flight ends:
    Pause the animation. so we can let the plane model stay put.
  */
};

export const destroyDemoFlightTracker = (viewer) => {
  // pause the clock
  viewer.clock.multiplier = 1;
  viewer.clock.shouldAnimate = false;
  // adjust the time to current time.
  const curJulianDate = Cesium.JulianDate.now();
  viewer.clock.currentTime = curJulianDate;
  const startTime = Cesium.JulianDate.addDays(curJulianDate, -1, new Cesium.JulianDate());
  const stopTime = Cesium.JulianDate.addDays(curJulianDate, 1, new Cesium.JulianDate());
  viewer.timeline.zoomTo(startTime, stopTime);

  // remove all entities
  viewer.entities.removeAll();

  hide_Animation_Timeline_Container(viewer);
};
