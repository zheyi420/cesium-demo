import Cesium from '../utils/cesium/Cesium';
import {
  display_Animation_Timeline_Container, hide_Animation_Timeline_Container, adjust_Animation_Timeline_toNow,
} from '../utils/cesium';
import { ConsoleLog } from '../utils';

let _viewer;
const createModel = (name, url, height) => {
  _viewer.entities.removeAll();

  const position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, height);
  const heading = Cesium.Math.toRadians(135);
  const pitch = 0;
  const roll = 0;
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

  const entity = _viewer.entities.add({
    name,
    position,
    orientation,
    model: {
      uri: url,
      minimumPixelSize: 128,
      maximumScale: 20000,
      heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    },
  });
  _viewer.trackedEntity = entity;
};

const options = [
  {
    text: 'Aircraft',
    onselect(name) {
      createModel(
        name,
        `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/Cesium_Air.glb`,
        5000.0,
      );
    },
  },
  {
    text: 'Drone',
    onselect(name) {
      createModel(
        name,
        `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/CesiumDrone.glb`,
        150.0,
      );
    },
  },
  {
    text: 'Ground Vehicle',
    onselect(name) {
      createModel(
        name,
        `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/GroundVehicle.glb`,
        0,
      );
    },
  },
  {
    text: 'Hot Air Balloon',
    onselect(name) {
      createModel(
        name,
        `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/CesiumBalloon.glb`,
        1000.0,
      );
    },
  },
  {
    text: 'Milk Truck',
    onselect(name) {
      createModel(
        name,
        `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/CesiumMilkTruck.glb`,
        0,
      );
    },
  },
  {
    text: 'Skinned Character',
    onselect(name) {
      createModel(
        name,
        `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/Cesium_Man.glb`,
        0,
      );
    },
  },
  {
    text: 'Unlit Box',
    onselect(name) {
      createModel(
        name,
        `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/BoxUnlit.gltf`,
        10.0,
      );
    },
  },
  {
    text: 'Draco Compressed Model',
    onselect(name) {
      createModel(
        name,
        `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/DracoCompressed/CesiumMilkTruck.gltf`, // FIXME Failed to load model
        0,
      );
    },
  },
  {
    text: 'KTX2 Compressed Balloon',
    onselect(name) {
      if (!Cesium.FeatureDetection.supportsBasis(_viewer.scene)) {
        window.alert('This browser does not support Basis Universal compressed textures'); // eslint-disable-line no-alert
      }
      createModel(
        name,
        `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/CesiumBalloonKTX2.glb`,
        1000.0,
      );
    },
  },
  {
    text: 'Instanced Box',
    onselect(name) {
      createModel(
        name,
        `${import.meta.env.VITE_BUILD_PATH_PREFIX}/SampleData/models/BoxInstanced/BoxInstanced.gltf`,
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
  ConsoleLog(`select option: ${JSON.stringify(selectedOption)}`);

  if (selectedOption.index === 0) {
    _viewer.entities.removeAll();
  } else {
    for (const option of options) {
      if (option.text === selectedOption.text) {
        option.onselect(option.text);
        break;
      }
    }
  }
};

export const get3DModelsOptions = () => filteredOption(options);

export const demo3DModels = (viewer) => {
  _viewer = viewer;
  display_Animation_Timeline_Container(viewer);
  viewer.clock.shouldAnimate = true; // the propeller and tire of all models would not rotate if setting viewer.clock.shouldAnimate falsy.
};

export const destroyDemo3DModels = (viewer) => {
  viewer.entities.removeAll();
  adjust_Animation_Timeline_toNow(viewer);
  hide_Animation_Timeline_Container(viewer);
};
