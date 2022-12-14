// https://pinia.vuejs.org/core-concepts/#setup-stores

import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
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
