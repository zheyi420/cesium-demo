import Cesium from './Cesium';

export default function initCesium(viewerType = '3D') {
  // The URL on your server where CesiumJS's static files are hosted.
  // CesiumJS requires a few static files to be hosted on your server, like web workers and SVG icons.
  // Configure your module bundler to copy the following four directories and serve them as static files:
  // * node_modules/cesium/Build/Cesium/Workers
  // * node_modules/cesium/Build/Cesium/ThirdParty
  // * node_modules/cesium/Build/Cesium/Assets
  // * node_modules/cesium/Build/Cesium/Widgets
  window.CESIUM_BASE_URL = '/cesium/Build/Cesium/';

  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzNmU5ZTZhOS1lOThmLTRlM2QtYjg2NS1iMGQ1Y2JiZGQyYzUiLCJpZCI6MTA4NDQ0LCJpYXQiOjE2NjM1Njc5OTR9.CuE8Bqn8X02o64kfjVHZUiUU1bKiNeqWYXoY7e5_BCc';

  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(80, 22, 130, 50);

  const containerID = viewerType === '3D' ? 'cesiumContainer' : 'cesiumContainer2D';

  const ViewerConstructorOptions = {
    animation: false,
    baseLayerPicker: true,
    fullscreenButton: false,
    geocoder: true,
    infoBox: false, // TODO What's this, how to display it?
    selectionIndicator: true, // TODO What's this, how to display it?
    timeline: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    skyAtmosphere: false,
    // Start in with the specific scene viewer.
    sceneMode: Cesium.SceneMode.SCENE3D, // MORPHING, COLUMBUS_VIEW, SCENE2D, SCENE3D
    // selectedTerrainProviderViewModel: // TODO
    // Use Cesium World Terrain
    terrainProvider: Cesium.createWorldTerrain({ // TODO
      requestWaterMask: false,
      requestVertexNormals: false,
    }),
    skyBox: false, // undefined | new Cesium.SkyBox(options)
    // Show Columbus View map with Web Mercator projection
    // mapProjection: new Cesium.WebMercatorProjection(),
  };
  // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
  const viewer = new Cesium.Viewer(containerID, { ...ViewerConstructorOptions });

  // hide the CreditDisplay
  viewer.bottomContainer.style.display = 'none'; // TODO may effect other potentially things' display.

  // Add basic drag and drop functionality
  viewer.extend(Cesium.viewerDragDropMixin);

  // Show a pop-up alert if we encounter an error when processing a dropped file
  viewer.dropError.addEventListener((dropHandler, name, error) => {
    console.log(error);
    window.alert(error);
  });

  // Add Cesium OSM Buildings, a global 3D buildings layer.
  // const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());

  // Fly the camera to San Francisco at the given longitude, latitude, and height.
  /* viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-15.0),
    },
  }); */

  return viewer;
}
