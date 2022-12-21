import Cesium from '../utils/cesium/Cesium';
import {
  display_Animation_Timeline_Container, hide_Animation_Timeline_Container, adjust_Animation_Timeline_toNow,
} from '../utils/cesium';

let _viewer;
const createModel = (url, height) => {
  _viewer.entities.removeAll();

  const position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, height);
  const heading = Cesium.Math.toRadians(135);
  const pitch = 0;
  const roll = 0;
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

  const entity = _viewer.entities.add({
    name: url,
    position,
    orientation,
    model: {
      uri: url,
      minimumPixelSize: 128,
      maximumScale: 20000,
    },
  });
  _viewer.trackedEntity = entity;
};

const options = [
  {
    text: 'Aircraft',
    onselect() {
      createModel(
        `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/Cesium_Air.glb`,
        5000.0,
      );
    },
  },
  {
    text: 'Drone',
    onselect() {
      createModel(
        `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/CesiumDrone.glb`,
        150.0,
      );
    },
  },
  {
    text: 'Ground Vehicle',
    onselect() {
      createModel(
        `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/GroundVehicle.glb`,
        100,
      );
    },
  },
  {
    text: 'Hot Air Balloon',
    onselect() {
      createModel(
        `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/CesiumBalloon.glb`,
        1000.0,
      );
    },
  },
  {
    text: 'Milk Truck',
    onselect() {
      createModel(
        `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/CesiumMilkTruck.glb`,
        100,
      );
    },
  },
  {
    text: 'Skinned Character',
    onselect() {
      createModel(
        `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/Cesium_Man.glb`,
        100,
      );
    },
  },
  {
    text: 'Unlit Box',
    onselect() {
      createModel(
        `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/BoxUnlit.gltf`,
        10.0,
      );
    },
  },
  {
    text: 'Draco Compressed Model',
    onselect() {
      createModel(
        `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/CesiumMilkTruck.gltf`,
        100,
      );
    },
  },
  {
    text: 'KTX2 Compressed Balloon',
    onselect() {
      if (!Cesium.FeatureDetection.supportsBasis(_viewer.scene)) {
        window.alert('This browser does not support Basis Universal compressed textures'); // eslint-disable-line no-alert
      }
      createModel(
        `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/CesiumBalloonKTX2.glb`,
        1000.0,
      );
    },
  },
  {
    text: 'Instanced Box',
    onselect() {
      createModel(
        `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/BoxInstanced.gltf`,
        15,
      );
    },
  },
];

const filteredOption = (optionArr) => {
  const textOnlyOption = [];
  for (const option of optionArr) {
    textOnlyOption.push({ text: option.text });
  }
  return textOnlyOption;
};

export const selectOption = (selectedOption) => {
  console.log(JSON.stringify(selectedOption));

  if (selectedOption.index === 0) {
    // TODO clear entity
  } else {
    // FIXME the propeller and tire of all models does not rotate
    // FIXME clamp the models which need to be on the groud to the ground.
    for (const option of options) {
      if (option.text === selectedOption.text) {
        option.onselect();
        break;
      }
    }
  }
};

export const get3DModelsOptions = () => filteredOption(options);

export const demo3DModels = (viewer) => {
  _viewer = viewer;
  display_Animation_Timeline_Container(viewer);
};

export const destroyDemo3DModels = (viewer) => {
  adjust_Animation_Timeline_toNow(viewer);
  hide_Animation_Timeline_Container(viewer);
};
