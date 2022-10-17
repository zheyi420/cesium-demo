<template>
  <div id="cesiumContainer"></div>
  <GalleryPanel @select="selectCase"/>
  <DemoProposedBuilding v-if="isCurDemoProposedBuilding"/>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import initCesium from '../utils/cesium/initCesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import GalleryPanel from './GalleryPanel.vue';
import DemoProposedBuilding from './DemoProposedBuilding.vue';
import { demoQuickStart, destroyDemoQuickStart } from '../demo/demoQuickStart';
import { demoFlightTracker, destroyDemoFlightTracker } from '../demo/demoFlightTracker';
import { demoProposedBuilding, destroyDemoProposedBuilding } from '../demo/demoProposedBuilding';
import { demoShowEntities, destroyDemoShowEntities } from '../demo/demoShowEntities';
import { useCurDemoStore } from '../stores/states';
import { ConsoleLog } from '../utils';

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

const isCurDemoProposedBuilding = computed(() => {
  if (!storeCurDemo.hasDemoRun) return false;
  const demoCaseInfo = storeCurDemo.getCurDemo.categoryLabel.concat('-', storeCurDemo.getCurDemo.label);
  return storeCurDemo.hasDemoRun && demoCaseInfo === 'Beginner-Proposed Building';
});

const demoCase = (caseInfo) => {
  ConsoleLog('CesiumContainer run demoCase(): ', caseInfo.label);

  switch (caseInfo.categoryLabel.concat('-', caseInfo.label)) {
    case 'Beginner-QuickStart': {
      demoQuickStart(viewer);
      break;
    }
    case 'Beginner-Flight Tracker': {
      demoFlightTracker(viewer);
      break;
    }
    case 'Beginner-Proposed Building': {
      demoProposedBuilding(viewer);
      break;
    }
    case 'Beginner-Show Entities': {
      demoShowEntities(viewer);
      break;
    }
    default: {
      ConsoleLog("demoCase() didn't match the case info.");
      break;
    }
  }

  storeCurDemo.activateDemo({ ...caseInfo });
};

const destroyCurDemo = () => {
  ConsoleLog('CesiumContainer run destroyCurDemo():', JSON.parse(JSON.stringify(storeCurDemo.getCurDemo)));

  switch (storeCurDemo.getCurDemo.categoryLabel.concat('-', storeCurDemo.getCurDemo.label)) {
    case 'Beginner-QuickStart': {
      destroyDemoQuickStart(viewer);
      break;
    }
    case 'Beginner-Flight Tracker': {
      destroyDemoFlightTracker(viewer);
      break;
    }
    case 'Beginner-Proposed Building': {
      destroyDemoProposedBuilding(viewer);
      break;
    }
    case 'Beginner-Show Entities': {
      destroyDemoShowEntities(viewer);
      break;
    }
    default: {
      ConsoleLog("destroyCurDemo() didn't match the case info.");
      break;
    }
  }

  storeCurDemo.destroyCurDemo();
};

const selectCase = (caseInfo) => {
  if (caseInfo == null) {
    // clear data, camera stay put.
    destroyCurDemo();
    ConsoleLog('data of case have been cleared.');
    return;
  }

  if (storeCurDemo.hasDemoRun) {
    // clear data, camera stay put.
    destroyCurDemo();
    ConsoleLog('data of previous case have been cleared, demo new case now...');
  }

  demoCase({ ...caseInfo });
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
