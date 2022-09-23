<template>
  <div id="cesiumContainer"></div>
  <GalleryPanel @select="selectCase"/>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Cesium from '../utils/cesium/Cesium';
import initCesium from '../utils/cesium/initCesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import GalleryPanel from './GalleryPanel.vue';
import { demoQuickStart, destroyDemoQuickStart } from '../utils/cesium/demoQuickStart';
import { storeCurDemo } from '../stores/states';

let viewer;

const demoCase = (caseInfo) => {
  switch (caseInfo.categoryLabel.concat('-', caseInfo.label)) {
    case 'Beginner-QuickStart': {
      demoQuickStart(viewer);
      break;
    }
    default:
      break;
  }
};

const destroyCurDemo = () => {
  console.log('CesiumContainer run destroyCurDemo().');

  switch (storeCurDemo.curDemo.value.categoryLabel.concat('-', storeCurDemo.curDemo.value.label)) {
    case 'Beginner-QuickStart': {
      destroyDemoQuickStart(viewer);
      break;
    }
    default:
      break;
  }
};

const selectCase = (caseInfo) => {
  if (caseInfo == null) {
    // clear data, camera stay put.
    destroyCurDemo();
    storeCurDemo.destroyCurDemo();
    console.log('data of case have been cleared.');
    return;
  }

  if (storeCurDemo.hasDemoRun()) {
    // clear data, camera stay put.
    destroyCurDemo();
    storeCurDemo.destroyCurDemo();
    console.log('data of previous case have been cleared, demo new case now...');
  }

  const { label } = caseInfo;
  demoCase({ ...caseInfo });
  storeCurDemo.activateDemo({ ...caseInfo });
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
