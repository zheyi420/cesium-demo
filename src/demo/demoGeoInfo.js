import Cesium from '../utils/cesium/Cesium';

const getSceneCoord = (viewer, position) => {
  console.log('pickPositionSupported:', viewer.scene.pickPositionSupported);

  const coordCartesian3 = viewer.scene.pickPosition(position);
  console.log('Cartesian3 position', coordCartesian3); // Cartesian3

  if (!viewer.scene.globe.depthTestAgainstTerrain) {
    viewer.scene.globe.depthTestAgainstTerrain = true;
    const coordCartesian3WhithDepthTestAgainstTerrain = viewer.scene.pickPosition(position);
    console.log('Cartesian3 position with truthy depthTestAgainstTerrain', coordCartesian3WhithDepthTestAgainstTerrain); // Cartesian3
    viewer.scene.globe.depthTestAgainstTerrain = false;
  }
};

const getGeoCoord = (viewer, position) => {
  const ray = viewer.camera.getPickRay(position);
  const coordCartesian3 = viewer.scene.globe.pick(ray, viewer.scene);
  console.log('地表位置 Cartesian3:', coordCartesian3); // Cartesian3

  if (!viewer.scene.globe.depthTestAgainstTerrain) {
    viewer.scene.globe.depthTestAgainstTerrain = true;
    const _ray = viewer.camera.getPickRay(position);
    const _coordCartesian3 = viewer.scene.globe.pick(_ray, viewer.scene);
    console.log('地表位置 truthy depthTestAgainstTerrain Cartesian3:', _coordCartesian3); // Cartesian3
    viewer.scene.globe.depthTestAgainstTerrain = false;
  }

  // Cartesian3 -> Cartographic [Cesium.Cartographic.fromCartesian]
  const coordCartographicFromCartographic = Cesium.Cartographic.fromCartesian(coordCartesian3);
  console.log('地表位置 Cartographic [通过 Cesium.Cartographic.fromCartesian]:', coordCartographicFromCartographic);

  // Cartesian3 -> Cartographic -> WGS84 [通过 Cesium.Cartographic.fromCartesian]
  const coordWGS84LonFromCartographic = Cesium.Math.toDegrees(coordCartographicFromCartographic.longitude);
  const coordWGS84LatFromCartographic = Cesium.Math.toDegrees(coordCartographicFromCartographic.latitude);
  const coordWGS84HeightFromCartographic = coordCartographicFromCartographic.height;
  console.log(`地表位置 WGS84 [通过 Cesium.Cartographic.fromCartesian]: lon:${coordWGS84LonFromCartographic}, lat:${coordWGS84LatFromCartographic}, height:${coordWGS84HeightFromCartographic}`);

  // Cartesian3 -> Cartographic [Cesium.Ellipsoid.WGS84.cartesianToCartographic]
  const coordCartographicFromEllipsoid = Cesium.Ellipsoid.WGS84.cartesianToCartographic(coordCartesian3);
  console.log('地表位置 Cartographic [通过 Cesium.Ellipsoid.WGS84.cartesianToCartographic]:', coordCartographicFromEllipsoid);

  // Cartesian3 -> Cartographic -> WGS84 [通过 Cesium.Ellipsoid.WGS84.cartesianToCartographic]
  const coordWGS84LonFromEllipsoid = Cesium.Math.toDegrees(coordCartographicFromEllipsoid.longitude);
  const coordWGS84LatFromEllipsoid = Cesium.Math.toDegrees(coordCartographicFromEllipsoid.latitude);
  const coordWGS84HeightFromEllipsoid = coordCartographicFromEllipsoid.height;
  console.log(`地表位置 WGS84 [通过 Cesium.Ellipsoid.WGS84.cartesianToCartographic]: lon:${coordWGS84LonFromEllipsoid}, lat:${coordWGS84LatFromEllipsoid}, height:${coordWGS84HeightFromEllipsoid}`);
};

const getEllipsoidCoord = (viewer, position) => {
  const ellipsoidPosition = viewer.scene.camera.pickEllipsoid(position, viewer.scene.globe.ellipsoid);
  console.log('椭球面位置 Cartesian3:', ellipsoidPosition); // Cartesian3
};

export const demoGeoInfo = (viewer) => {
  const flyToOptions = {
    destination: Cesium.Cartesian3.fromDegrees(113.38666340714809, 23.05494398718381, 10000),
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-90.0),
      roll: 0.0,
    },
    // duration: 3,
    complete: () => {
      console.log('fly complete');
    },
    cancel: () => {
      console.log('fly cancel');
    },
    // endTransform: Cesium.Matrix4.IDENTITY,
  };
  viewer.camera.flyTo(flyToOptions);

  // Handles user input events.
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

  handler.setInputAction((event) => {
    console.log('event.position', event.position); // event: {position: Cartesian2}

    // 1. 屏幕坐标 -> 场景坐标
    // getSceneCoord(viewer, event.position);

    // 2. 屏幕坐标 -> 地表坐标
    getGeoCoord(viewer, event.position);

    // 3. 屏幕坐标 -> 椭球面坐标
    getEllipsoidCoord(viewer, event.position);
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
};

export const destroyGeoInfo = (viewer) => {};
