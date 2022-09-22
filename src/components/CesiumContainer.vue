<template>
  <div id="cesiumContainer"></div>
  <OperationPanel @select="selectCase"/>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Cesium from '../utils/cesium/Cesium';
import initCesium from '../utils/cesium/initCesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import OperationPanel from './OperationPanel.vue';

let viewer;

const addOSMBuildingsandFlyTo = () => {
  // Add Cesium OSM Buildings, a global 3D buildings layer.
  const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());

  // Fly the camera to San Francisco at the given longitude, latitude, and height.
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-15.0),
    },
  });
};

const demoCase = (caseInfo) => {

};

const selectCase = (caseInfo) => {
  if (caseInfo == null) {
    // clear data, camera stay put
    // clearCaseData();
    console.log('data of case have been cleared.');
    return;
  }

  const { label } = caseInfo;
  demoCase({ ...caseInfo });
  console.log(`demo case ${label}.`);
};

onMounted(() => {
  viewer = initCesium();
});

</script>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>
