<template>
  <div id="panelContainer" :class="{ hide: !panelVisible }">
    <div class="panel">
      <header class="panel-header">
        <span>CesiumJS Code Examples</span>
      </header>
      <div class="panel-content">
        <div class="panel-content-gallery" v-for="(category, category_index) in gallery" :key="category_index">
          <header class="panel-content-category-header">
            {{ category.label }}
          </header>
          <div class="panel-content-category-list">
            <button
              v-for="(item, item_index) in category.contents"
              :key="item_index"
              :class="{ active: item.active }"
              @click="btnClickHandler(item, category)">{{ item.label }}</button>
          </div>
        </div>
      </div>
    </div>
    <aside class="toggle-btn" @click="togglePanelVisibility">
      <span :class="{ 'slide-in': panelVisible }">&lt;</span>
    </aside>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const panelVisible = ref(true);
const currentSelection = ref(null);
// const props = defineProps([]);
const emits = defineEmits(['select']);

const togglePanelVisibility = () => {
  panelVisible.value = !panelVisible.value;
};

const inactivateSelection = () => {
  if (currentSelection.value != null) currentSelection.value.active = false;
};

const btnClickHandler = (item, category) => {
  if (item.active) {
    inactivateSelection();
    currentSelection.value = null;
    emits('select', null); // TODO use stored variable to signify the currentSelection.
  } else {
    inactivateSelection();
    item.active = true;
    currentSelection.value = item;
    emits('select', { ...item, categoryLabel: category.label });
  }
  // console.log('currentSelection:', currentSelection.value);
};

const gallery = reactive([
  {
    label: 'Beginner',
    contents: [
      {
        label: 'QuickStart',
        description: 'A basic Cesium app loading global 3D terrain and buildings in San Francisco.',
      },
    ],
  },
  {
    label: '3D Tiles',
    contents: [
      {
        label: 'Adjust Height',
        description: 'Adjust the height of a 3D Tiles tileset.',
      },
      {
        label: 'BIM',
        description: 'A sample BIM dataset rendered with 3D Tiles.',
      },
      {
        label: 'Batch Table Hierarchy',
        description: 'Demonstrates use cases for a batch table hierarchy.',
      },
      {
        label: 'Clipping Planes',
        description: 'User-defined clipping planes applied to a batched 3D Tileset, point cloud, and model.',
      },
      {
        label: 'Compare',
        description: 'Compare 3D Tiles tilesets by showing different ones on different sides of the screen.',
      },
      {
        label: 'Feature Picking',
        description: 'Pick features in a 3D Tiles tileset.',
      },
    ],
  },
  {
    label: '3D Tiles Next',
    contents: [
      {
        label: 'CDB Yemen',
        description: 'Load a 3D Tile Next tileset converted from CDB.',
      },
      {
        label: 'Photogrammetry Classification',
        description: 'Load a photogrammetry dataset with feature ID textures from EXT_mesh_features.',
      },
    ],
  },
  {
    label: 'Post Processing',
    contents: [
      {
        label: 'Ambient Occlusion',
        description: 'Ambient Occlusion.',
      },
    ],
  },
]);

</script>

<style scoped lang="less">
#panelContainer {
  font-size: 14px;
  position: fixed;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 250px;
  height: auto;
  min-height: 150px;
  background: rgba(0, 0, 0, 0.4);
  transition: right 0.24s ease-in-out;
  border-radius: 5px;
  border: 1px solid steelblue;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  &.hide {
    right: -250px;
  }
  .panel {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .panel-header {
    padding: 0 0 0 10px;
    line-height: 30px;
    color: #fff;
    display: flex;
    justify-content: space-between;
  }
  .panel-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    overflow: auto;
    .panel-content-category-header {
      font-weight: bold;
      color: steelblue;
      text-align: start;
      line-height: 30px;
      border-top: 1px solid rgba(70, 131, 180, 0.596)
    }
    .panel-content-category-list {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      button {
        margin: 0px 0px 10px 0px;
        background: transparent;
        border-radius: 4px;
        cursor: pointer;
        padding: 6px 12px;
        color: #fff;
        border: 1px solid steelblue;
        transition: all 0.1s ease-in-out;
        &:hover {
          background: steelblue;
        }
        &.active {
          background: slateblue;
        }
      }
    }
  }
  .toggle-btn {
    width: 20px;
    height: 30px;
    font-size: 18px;
    text-align: center;
    line-height: 30px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    position: absolute;
    left: -21px;
    top: calc(50% - 15px);
    color: #fff;
    background: rgb(70, 131, 180);
    cursor: pointer;
    opacity: 0.6;
    transition: all 0.25s ease-in-out;
    span {
      transition: all 0.25s ease-in-out;
      &.slide-in {
        display: inline-block;
        transform: rotate(0.5turn);
      }
    }
    &:hover {
      opacity: 1;
    }
  }
}

</style>
