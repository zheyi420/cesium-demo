// https://pinia.vuejs.org/core-concepts/#setup-stores

import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});

// TODO
export const useCurDemoStore = defineStore('CurDemo', () => {
  const curDemo = ref(null);

  function hasDemoRun() {
    return curDemo.value != null;
  }
  function activateDemo(demoInfo) {
    curDemo.value = { ...demoInfo };
  }
  function destroyCurDemo() {
    curDemo.value = null;
  }

  return {
    curDemo, hasDemoRun, activateDemo, destroyCurDemo,
  };
});
