import Cesium from './Cesium';

export default async function initCesium(viewerType = '3D') {
  // The URL on your server where CesiumJS's static files are hosted.
  // CesiumJS requires a few static files to be hosted on your server, like web workers and SVG icons.
  // Configure your module bundler to copy the following four directories and serve them as static files:
  // * node_modules/cesium/Build/Cesium/Workers
  // * node_modules/cesium/Build/Cesium/ThirdParty
  // * node_modules/cesium/Build/Cesium/Assets
  // * node_modules/cesium/Build/Cesium/Widgets
  // The window.CESIUM_BASE_URL global variable must be set before CesiumJS is imported.
  // It must point to the URL where those four directories are served.
  // https://cesium.com/learn/cesiumjs-learn/cesiumjs-quickstart/#install-with-npm
  window.CESIUM_BASE_URL = `${import.meta.env.VITE_BUILD_PATH_PREFIX}/cesium/Build/Cesium/`;

  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ZmY2ZWNkYy04ZjI4LTQ1ZjQtYjRhYS0wZjYwMDdmNmUyZTUiLCJpZCI6MTA4NDQ0LCJpYXQiOjE3NTM4MDQyNzV9.9007CkJcf5kmK2odPZVGTrWExOwhOZy6mqs0GD_wo7A';
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(80, 22, 130, 50);

  const containerID = viewerType === '3D' ? 'cesiumContainer' : 'cesiumContainer2D';

  try {
    // Initialize the Cesium Viewer in the HTML element with the containerID.
    const viewer = new Cesium.Viewer(containerID, {
      sceneModePicker: false,
      shadows: true,
      navigationInstructionsInitiallyVisible: false,
      // selectedTerrainProviderViewModel: // TODO
      // Use Cesium World Terrain
      terrainProvider: await Cesium.createWorldTerrainAsync(),
      /* terrainProvider: await Cesium.CesiumTerrainProvider.fromIonAssetId(1, { // https://ion.cesium.com/assets/1
        requestWaterMask: false,
        requestVertexNormals: false,
      }) */
      // Show Columbus View map with Web Mercator projection
      // mapProjection: new Cesium.WebMercatorProjection(),
      // showRenderLoopErrors: false, // TODO
    });

    viewer.scene.globe.enableLighting = true;

    // hide the CreditDisplay
    viewer.cesiumWidget.creditContainer.style.visibility = 'hidden'; // seems same as -> viewer.bottomContainer.style.visibility = 'hidden';
    // hide the animation
    viewer.animation.container.style.visibility = 'hidden';
    // hide the timeline
    viewer.timeline.container.style.visibility = 'hidden';

    // Add basic drag and drop functionality
    viewer.extend(Cesium.viewerDragDropMixin);

    // Show a pop-up alert if we encounter an error when processing a dropped file
    viewer.dropError.addEventListener((dropHandler, name, error) => {
      console.log(error);
      window.alert(error);
    });

    return viewer;
  } catch (error) {
    console.log(error);
    return error;
  }
}
