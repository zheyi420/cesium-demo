<template>
  <div>
    <select id="select-option">
      <option v-for="(option, index) in optionArr" :key="index">{{ option.text }}</option>
    </select>
  </div>
</template>

<script setup>
import {
  ref, reactive, computed, watch, onMounted,
} from 'vue';
import { selectOption } from '../demo/demo3DModels';
import { ConsoleLog } from '../utils';

const selectedOption = reactive({
  index: undefined,
  text: undefined,
});

onMounted(() => {
  const selectElem = document.getElementById('select-option');
  selectElem.addEventListener('change', () => {
    selectedOption.index = selectElem.selectedIndex;
    selectedOption.text = selectElem.options[selectElem.selectedIndex].text;

    selectOption(selectedOption);
  });
});

const props = defineProps(['dropDownMenuOptionOfDemo']);

const optionArrNULL = ref([
  {
    text: '-- Please choose an option --',
    value: null,
  },
]);

const optionArr = computed(() => optionArrNULL.value.concat(props.dropDownMenuOptionOfDemo));

</script>

<style scoped lang="less">
#select-option {
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
  /* &:hover {
    background: steelblue;
  } */
}
</style>
