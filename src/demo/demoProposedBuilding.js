import Cesium from '../utils/cesium/Cesium';
import {
  display_Animation_Timeline_Container, hide_Animation_Timeline_Container, addOSMBuildings, removePrimitive, adjust_Animation_Timeline_toNow,
} from '../utils/cesium';
import { ConsoleLog } from '../utils';

let primitive_CesiumOsmBuildings;
let primitive_ProposedBuildingTileset;
let dataSource_BuildingFootprint;

const StyleShowConditions_HideOsmBuildingsInFoorprint = [
  // Any building that has this elementId will have `show = false`.
  ['${elementId} === 332469316', false], // eslint-disable-line no-template-curly-in-string
  ['${elementId} === 332469317', false], // eslint-disable-line no-template-curly-in-string
  ['${elementId} === 235368665', false], // eslint-disable-line no-template-curly-in-string
  ['${elementId} === 530288180', false], // eslint-disable-line no-template-curly-in-string
  ['${elementId} === 530288179', false], // eslint-disable-line no-template-curly-in-string
  ['${elementId} === 532245203', false], // eslint-disable-line no-template-curly-in-string
  // If a building does not have one of these elementIds, set `show = true`.
  [true, true],
];

const color_OsmBuildings = "Boolean(${feature['cesium#color']}) ? color(${feature['cesium#color']}) : color('#ffffff')"; // eslint-disable-line no-template-curly-in-string

const Cesium3DTileStyle_HideOsmBuildingsInFoorprint = new Cesium.Cesium3DTileStyle({
  show: {
    conditions: StyleShowConditions_HideOsmBuildingsInFoorprint,
  },
  color: color_OsmBuildings,
});

const Cesium3DTileStyle_DisplayOsmBuildingsInFoorprint = new Cesium.Cesium3DTileStyle({
  show: true,
  color: color_OsmBuildings,
});

/* const _addBuildingFootprint = (viewer) => {
  Cesium.IonResource.fromAssetId(1353082).then((ionRes) => {
    Cesium.GeoJsonDataSource.load(ionRes, { clampToGround: true }).then((geoJsonDataSource) => {
      viewer.dataSources.add(geoJsonDataSource).then((res) => {
        const dataSource = res;

        for (const entity of dataSource.entities.values) {
          entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
        }

        viewer.flyTo(dataSource);

        return dataSource;
      });
    });
  });
}; */

/**
 * Add footprint of the proposed Building.
 * @param {Viewer} viewer
 */
async function addBuildingFootprint(viewer) {
  // Load the GeoJSON file from Cesium ion.
  const ionResource = await Cesium.IonResource.fromAssetId(1353082);
  // Create the geometry from the GeoJSON, and clamp it to the ground.
  const geoJsonDataSource = await Cesium.GeoJsonDataSource.load(ionResource, { clampToGround: true });
  // Add it to the scene.
  const dataSource = await viewer.dataSources.add(geoJsonDataSource);
  // By default, polygons in CesiumJS will be draped over all 3D content in the scene.
  // Modify the polygons so that this draping only applies to the terrain, not 3D buildings.
  for (const entity of dataSource.entities.values) {
    entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
  }

  return dataSource;
}

/**
 * @param {Viewer} viewer
 */
export async function demoProposedBuilding(viewer) {
  display_Animation_Timeline_Container(viewer);

  primitive_CesiumOsmBuildings = addOSMBuildings(viewer);

  dataSource_BuildingFootprint = await addBuildingFootprint(viewer);
  ConsoleLog('dataSource_BuildingFootprint:', dataSource_BuildingFootprint);

  primitive_CesiumOsmBuildings.style.show = {
    conditions: StyleShowConditions_HideOsmBuildingsInFoorprint,
  };

  // Add the 3D Tileset you created from your Cesium ion account.
  primitive_ProposedBuildingTileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
      url: Cesium.IonResource.fromAssetId(1355614),
    }),
  );

  // Move the camera to the new building.
  const heading = Cesium.Math.toRadians(-45.0);
  const pitch = Cesium.Math.toRadians(-10.0);
  const range = 800.0;
  viewer.flyTo(primitive_ProposedBuildingTileset, {
    offset: new Cesium.HeadingPitchRange(heading, pitch, range),
  });
}

/**
 * @param {Viewer} viewer
 */
export const destroyDemoProposedBuilding = (viewer) => {
  adjust_Animation_Timeline_toNow(viewer);

  hide_Animation_Timeline_Container(viewer);

  removePrimitive(viewer, primitive_CesiumOsmBuildings);
  primitive_CesiumOsmBuildings = undefined;

  // remove the Building Foorprint.
  viewer.dataSources.remove(dataSource_BuildingFootprint, true);

  // remove the Proposed Building.
  removePrimitive(viewer, primitive_ProposedBuildingTileset);
  primitive_ProposedBuildingTileset = undefined;
};

const toggleShowStatus_CesiumOSMBuildings = (showStatus) => {
  // TODO can not set property show directly. Don't know why. BUT it can be set in the function demoProposedBuilding() above.
  // primitive_CesiumOsmBuildings.style.show = showStatus ? true : { conditions: StyleShowConditions_HideOsmBuildingsInFoorprint };
  primitive_CesiumOsmBuildings.style = showStatus ? Cesium3DTileStyle_DisplayOsmBuildingsInFoorprint : Cesium3DTileStyle_HideOsmBuildingsInFoorprint;
};

export const toggleShowStatus_ProposedBuilding = (showStatus) => {
  primitive_ProposedBuildingTileset.show = showStatus;
  toggleShowStatus_CesiumOSMBuildings(!showStatus);
  return showStatus;
};
