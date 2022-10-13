// https://pinia.vuejs.org/core-concepts/#setup-stores

import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCurDemoStore = defineStore('CurDemo', () => {
  // pass in a function that defines reactive properties and methods,
  // and returns an object with the properties and methods we want to expose.

  // state
  const curDemo = ref(null);

  // getters
  const getCurDemo = computed(() => ({ ...curDemo.value }));

  const hasDemoRun = computed(() => curDemo.value != null);

  // actions
  function activateDemo(demoInfo) {
    curDemo.value = { ...demoInfo };
  }
  function destroyCurDemo() {
    curDemo.value = null;
  }

  // watchers
  // ...

  return {
    getCurDemo, hasDemoRun, activateDemo, destroyCurDemo,
  };
});

export const usePrimitiveStore = defineStore('CurPrimitive', () => {
  // state
  const curPrimitive = ref(null);

  // getters
  const getCurPrimitive = computed(() => ({ ...curPrimitive.value }));

  const hasPrimitiveStore = computed(() => (curPrimitive.value != null));

  // actions
  function storePrimitive(primitive) {
    curPrimitive.value = primitive;
  }
  function toggleCurPrimitiveShowStatus() {
    curPrimitive.value.show = !curPrimitive.value.show;
  }
  function destroyCurPrimitive() {

  }

  return {
    getCurPrimitive, hasPrimitiveStore, storePrimitive, toggleCurPrimitiveShowStatus, destroyCurPrimitive,
  };
});
