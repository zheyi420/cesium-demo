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
  position: fixed;
  top: 5px;
  left: 5px;
  cursor: pointer;
}
</style>
