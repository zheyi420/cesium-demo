<template>
  <div>
    <button class="toolbar-button" type="button" @click="onClick">
      <label style="pointer-events: none;">
        <input type="checkbox" style="pointer-events: none;" :checked="checked">
        Per-feature selection
      </label>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { toggleFeatureShow } from '../demo/3DTilesBIM';

const checked = ref(false);

const onClick = (e) => {
  checked.value = !checked.value;
  toggleFeatureShow(checked.value);
};

</script>

<style scoped lang="less">
.toolbar-button {
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

}
</style>
