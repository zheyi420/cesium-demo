<template>
  <div id="cesiumContainer"></div>
  <GalleryPanel @select="selectCase" />
  <DemoProposedBuilding v-if="isCurDemoProposedBuilding" />
  <DropDownMenu v-if="hasDropDownMenu" :dropDownMenuOptionOfDemo="dropDownMenuOptionOfDemo" />
  <ToolbarButtonType v-if="isToolbarButtonType" />
  <Demo3DTilesClippingPlanes v-if="isCurDemo3DTilesClippingPlanes" />
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue';
import initCesium from '../utils/cesium/initCesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import GalleryPanel from './GalleryPanel.vue';
import DemoProposedBuilding from './DemoProposedBuilding.vue';
import DropDownMenu from './DropDownMenu.vue';
import ToolbarButtonType from './ToolbarButtonType.vue';
import Demo3DTilesClippingPlanes from './Demo3DTilesClippingPlanes.vue';
import { demoQuickStart, destroyDemoQuickStart } from '../demo/demoQuickStart';
import { demoFlightTracker, destroyDemoFlightTracker } from '../demo/demoFlightTracker';
import { demoProposedBuilding, destroyDemoProposedBuilding } from '../demo/demoProposedBuilding';
import { demoShowEntities, destroyDemoShowEntities } from '../demo/demoShowEntities';
import { get3DModelsOptions, demo3DModels, destroyDemo3DModels } from '../demo/demo3DModels';
import { demo3DTilesBIM, destroyDemo3DTilesBIM } from '../demo/3DTilesBIM';
import { demo3DTilesClippingPlanes, destroyDemo3DTilesClippingPlanes } from '../demo/3DTilesClippingPlanes';
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

const dropDownMenuOptionOfDemo = reactive([]);

const demoCaseInfo = computed(() => storeCurDemo.getCurDemo.categoryLabel.concat('-', storeCurDemo.getCurDemo.label));

const isCurDemoProposedBuilding = computed(() => storeCurDemo.hasDemoRun && demoCaseInfo.value === 'Other-Proposed Building');

const hasDropDownMenu = computed(() => storeCurDemo.hasDemoRun && demoCaseInfo.value === 'Other-3D Models');

const isToolbarButtonType = computed(() => storeCurDemo.hasDemoRun && demoCaseInfo.value === '3D Tiles-BIM');

const isCurDemo3DTilesClippingPlanes = computed(() => storeCurDemo.hasDemoRun && demoCaseInfo.value === '3D Tiles-Clipping Planes');

const demoCase = (caseInfo) => {
  ConsoleLog(`CesiumContainer run demoCase(): ${caseInfo.categoryLabel} - ${caseInfo.label}`);

  switch (caseInfo.categoryLabel.concat('-', caseInfo.label)) {
    case 'Other-QuickStart': {
      demoQuickStart(viewer);
      break;
    }
    case 'Other-Flight Tracker': {
      demoFlightTracker(viewer);
      break;
    }
    case 'Other-Proposed Building': {
      demoProposedBuilding(viewer);
      break;
    }
    case 'Other-Show Entities': {
      demoShowEntities(viewer);
      break;
    }
    case 'Other-3D Models': {
      const options = get3DModelsOptions();
      for (const option of options) {
        dropDownMenuOptionOfDemo.push(option);
      }
      demo3DModels(viewer);
      break;
    }
    case '3D Tiles-BIM': {
      demo3DTilesBIM(viewer);
      break;
    }
    case '3D Tiles-Clipping Planes': {
      demo3DTilesClippingPlanes(viewer);
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
    case 'Other-QuickStart': {
      destroyDemoQuickStart(viewer);
      break;
    }
    case 'Other-Flight Tracker': {
      destroyDemoFlightTracker(viewer);
      break;
    }
    case 'Other-Proposed Building': {
      destroyDemoProposedBuilding(viewer);
      break;
    }
    case 'Other-Show Entities': {
      destroyDemoShowEntities(viewer);
      break;
    }
    case 'Other-3D Models': {
      dropDownMenuOptionOfDemo.splice(0, dropDownMenuOptionOfDemo.length);
      destroyDemo3DModels(viewer);
      break;
    }
    case '3D Tiles-BIM': {
      destroyDemo3DTilesBIM(viewer);
      break;
    }
    case '3D Tiles-Clipping Planes': {
      destroyDemo3DTilesClippingPlanes(viewer);
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
  initCesium()
    .then((res) => {
      viewer = res;
    });
});

</script>

<style scoped lang="less">
#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>
