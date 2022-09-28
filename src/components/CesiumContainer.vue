<template>
  <div id="cesiumContainer"></div>
  <GalleryPanel @select="selectCase"/>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import Cesium from '../utils/cesium/Cesium';
import initCesium from '../utils/cesium/initCesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import GalleryPanel from './GalleryPanel.vue';
import { demoQuickStart, destroyDemoQuickStart } from '../utils/cesium/demoQuickStart';
import { demoFlightTracker, destroyDemoFlightTracker } from '../utils/cesium/demoFlightTracker';
import { useCurDemoStore } from '../stores/states';

// We are defining a store because the store won't be created until use...Store() is called inside of setup().
// you can return the whole store instance to use it in the template.
const storeCurDemo = useCurDemoStore();
// const getCurDemo = computed(() => storeCurDemo.getCurDemo);
// const hasDemoRun = computed(() => storeCurDemo.hasDemoRun);
// Note that store is an object wrapped with reactive, meaning there is no need to write .value after getters but, like props in setup, we cannot destructure it:
// const { getCurDemo, hasDemoRun } = storeCurDemo; // ❌ This won't work because it breaks reactivity, it's the same as destructuring from `props`.
// Note you can destructure actions directly from the store as they are bound to the store itself too.
// const { activateDemo, destroyCurDemo } = storeCurDemo;

let viewer;

const demoCase = (caseInfo) => {
  switch (caseInfo.categoryLabel.concat('-', caseInfo.label)) {
    case 'Beginner-QuickStart': {
      demoQuickStart(viewer);
      break;
    }
    case 'Beginner-Flight Tracker': {
      demoFlightTracker(viewer);
      break;
    }
    default: {
      console.log("demoCase() didn't match the case info.");
      break;
    }
  }

  storeCurDemo.activateDemo({ ...caseInfo });
};

const destroyCurDemo = () => {
  console.log('CesiumContainer run destroyCurDemo().');

  console.log('the current demo which need to be destroyed:', JSON.parse(JSON.stringify(storeCurDemo.getCurDemo)));
  switch (storeCurDemo.getCurDemo.categoryLabel.concat('-', storeCurDemo.getCurDemo.label)) {
    case 'Beginner-QuickStart': {
      destroyDemoQuickStart(viewer);
      break;
    }
    case 'Beginner-Flight Tracker': {
      destroyDemoFlightTracker();
      break;
    }
    default: {
      console.log("destroyCurDemo() didn't match the case info.");
      break;
    }
  }

  storeCurDemo.destroyCurDemo();
};

const selectCase = (caseInfo) => {
  if (caseInfo == null) {
    // clear data, camera stay put.
    destroyCurDemo();
    console.log('data of case have been cleared.');
    return;
  }

  if (storeCurDemo.hasDemoRun) {
    // clear data, camera stay put.
    destroyCurDemo();
    console.log('data of previous case have been cleared, demo new case now...');
  }

  const { label } = caseInfo;
  demoCase({ ...caseInfo });
  console.log(`demo case ${label}.`);
};

onMounted(() => {
  viewer = initCesium();
});

</script>

<style scoped lang="less">
#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>
