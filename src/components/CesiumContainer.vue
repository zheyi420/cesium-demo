<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Cesium from '../utils/cesium/Cesium';
import initCesium from '../utils/cesium/initCesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

let viewer;

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
