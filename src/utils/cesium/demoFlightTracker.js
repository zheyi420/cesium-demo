import Cesium from './Cesium';
import trajectory from './assets/trajectorySanFrancisco2Copenhagen.json';

const display_Animation_Timeline_Container = () => {
  // display the animationContainer and the timelineContainer.
  const cesiumContainer = document.getElementById('cesiumContainer');
  const timelineContainer = cesiumContainer.getElementsByClassName('cesium-viewer-timelineContainer')[0];
  timelineContainer.style.display = 'block';
  const animationContainer = cesiumContainer.getElementsByClassName('cesium-viewer-animationContainer')[0];
  animationContainer.style.display = 'block';
};

const hide_Animation_Timeline_Container = () => {};

export const demoFlightTracker = (viewer) => {
  display_Animation_Timeline_Container();

  // Fly the camera to the first point.
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-122.39053, 37.61779, -27.32),
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
  viewer.clock.multiplier = 50;
  // Start playing the scene.
  viewer.clock.shouldAnimate = true;

  // The SampledPositionedProperty stores the position and timestamp for each sample along the radar sample series.
  const positionProperty = new Cesium.SampledPositionProperty();

  // Create a point for each.
  // TODO detect if the viewer have fly to the destination and the terrain have loaded. add point entity after that.
  for (let i = 0; i < trajectoryData.length; i++) {
    const dataPoint = trajectoryData[i];

    // Declare the time for this individual sample and store it in a new JulianDate instance.
    const time = Cesium.JulianDate.addSeconds(start, i * timeStepInSeconds, new Cesium.JulianDate());
    const position = Cesium.Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height);
    // Store the position along with its timestamp.
    // Here we add the positions all upfront, but these can be added at run-time as samples are received from a server.
    positionProperty.addSample(time, position);

    // Mark this location with a red point.
    viewer.entities.add({
      description: `Location: (${dataPoint.longitude}, ${dataPoint.latitude}, ${dataPoint.height})`,
      position,
      point: { pixelSize: 10, color: Cesium.Color.RED },
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
};

export const destroyDemoFlightTracker = () => { };
