<template>
  <div>
    <button id="toggle-building">Toggle Proposed Building</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePrimitiveStore } from '../stores/states';

const storeCurPrimitive = usePrimitiveStore();

const initBtn = () => {
  document.querySelector('#toggle-building').onclick = () => {
    storeCurPrimitive.toggleCurPrimitiveShowStatus();
  };
};

onMounted(() => {
  initBtn();
});
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
