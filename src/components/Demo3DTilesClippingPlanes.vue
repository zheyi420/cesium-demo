<template>
  <div id="demo-3dtiles-clipping-planes-toolbar">
    <select v-model="viewModel.currentExampleType" @change="handleClipObjectChange">
      <option v-for="option in viewModel.exampleTypes" :key="option" :value="option">{{ option }}</option>
    </select>
    <input type="checkbox" v-model="viewModel.debugBoundingVolumesEnabled" @change="handleBoundingVolumeChange">
    Show bounding volume
    <input type="checkbox" v-model="viewModel.edgeStylingEnabled" @change="handleEdgeStylingChange">
    Enable edge styling
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ConsoleLog } from '../utils';
import { selectClipObject, selectBoundingVolumesEnabled, selectStylingEnabled } from '../demo/3DTilesClippingPlanes';

const clipObjects = ref(["BIM", "Point Cloud", "Instanced", "Model"]);

const viewModel = reactive({
  debugBoundingVolumesEnabled: false,
  edgeStylingEnabled: true,
  exampleTypes: clipObjects,
  currentExampleType: clipObjects.value[0],
});

const handleClipObjectChange = () => {
  ConsoleLog(viewModel.currentExampleType);
  selectClipObject(viewModel.currentExampleType);
};

const handleBoundingVolumeChange = () => {
  ConsoleLog('Show bounding volume:', viewModel.debugBoundingVolumesEnabled);
  selectBoundingVolumesEnabled(viewModel.debugBoundingVolumesEnabled);
};

const handleEdgeStylingChange = () => {
  ConsoleLog('Enable edge styling:', viewModel.edgeStylingEnabled);
  selectStylingEnabled(viewModel.edgeStylingEnabled);
};

onMounted(() => {
  // selectClipObject(viewModel.currentExampleType);
})

</script>

<style scoped lang="less">
#demo-3dtiles-clipping-planes-toolbar {
  z-index: 1;
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 16px;
  // cursor: pointer;
  display: inline-block;
  background: rgba(42, 42, 42, 0.8);
  border: 1px solid #444;
  color: #edffff;
  fill: #edffff;
  border-radius: 4px;
  padding: 4px;
  margin: 2px 3px;
  overflow: hidden;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  select {
    cursor: pointer;
  }

  input {
    cursor: pointer;
    vertical-align: middle;
    padding-top: 2px;
    padding-bottom: 2px;
  }

}</style>
