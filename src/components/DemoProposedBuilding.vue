<template>
  <div>
    <button id="toggle-building" @click="toggleShowStatus">Toggle Proposed Building</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { toggleShowStatus_ProposedBuilding } from '../demo/demoProposedBuilding';
import { ConsoleLog } from '../utils';

const showStatus_ProposedBuilding = ref(true);

const toggleShowStatus = () => {
  // TODO add a detection indicate if the proposedBuilding loaded.
  showStatus_ProposedBuilding.value = toggleShowStatus_ProposedBuilding(!showStatus_ProposedBuilding.value);
  ConsoleLog('showStatus_ProposedBuilding:', showStatus_ProposedBuilding.value);
};

</script>

<style scoped lang="less">
#toggle-building {
  z-index: 1;
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
  background: #303336;
  border: 1px solid #444;
  color: #edffff;
  fill: #edffff;
  border-radius: 4px;
  padding: 7px 12px;
  margin: 2px 3px;
  overflow: hidden;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:hover {
    background: steelblue;
  }
}
</style>
