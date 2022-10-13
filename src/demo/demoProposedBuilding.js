import Cesium from '../utils/cesium/Cesium';
import {
  display_Animation_Timeline_Container, hide_Animation_Timeline_Container, addOSMBuildings, removePrimitive, adjust_Animation_Timeline_toNow,
} from '../utils/cesium';
import { ConsoleLog } from '../utils';
import { usePrimitiveStore } from '../stores/states';

let primitive_CesiumOSMBuildings;
let dataSource_BuildingFootprint;
let primitive_proposedBuildingTileset;
const storeCurPrimitive = usePrimitiveStore(); // TODO 在 js 文件中使用 Pinia

/**
 * Add footprint of the proposed Building.
 * @param {Viewer} viewer
 */
const _addBuildingFootprint = (viewer) => {
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
};

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
  // Move the camera so that the polygon is in view.
  viewer.flyTo(dataSource);

  return dataSource;
}

/**
 * @param {Viewer} viewer
 */
export async function demoProposedBuilding(viewer) {
  display_Animation_Timeline_Container(viewer);

  primitive_CesiumOSMBuildings = addOSMBuildings(viewer);

  dataSource_BuildingFootprint = await addBuildingFootprint(viewer);
  ConsoleLog('dataSource_BuildingFootprint:', dataSource_BuildingFootprint);

  // Now that we've identified where the new building will go, we can see which buildings are currently there.
  // https://github.com/CesiumGS/3d-tiles/tree/master/specification/Styling#overview
  // Hide individual buildings in this area using 3D Tiles Styling language.
  primitive_CesiumOSMBuildings.style.show = {
    conditions: [
      // Any building that has this elementId will have `show = false`.
      ['${elementId} === 332469316', false], // eslint-disable-line no-template-curly-in-string
      ['${elementId} === 332469317', false], // eslint-disable-line no-template-curly-in-string
      ['${elementId} === 235368665', false], // eslint-disable-line no-template-curly-in-string
      ['${elementId} === 530288180', false], // eslint-disable-line no-template-curly-in-string
      ['${elementId} === 530288179', false], // eslint-disable-line no-template-curly-in-string
      ['${elementId} === 532245203', false], // eslint-disable-line no-template-curly-in-string
      // If a building does not have one of these elementIds, set `show = true`.
      [true, true],
    ],
  };

  // Add the 3D Tileset you created from your Cesium ion account.
  primitive_proposedBuildingTileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
      url: Cesium.IonResource.fromAssetId(1355614),
    }),
  );

  storeCurPrimitive.storePrimitive(primitive_proposedBuildingTileset); // TODO

  // Move the camera to the new building.
  viewer.flyTo(primitive_proposedBuildingTileset);
}

/**
 * @param {Viewer} viewer
 */
export const destroyDemoProposedBuilding = (viewer) => {
  adjust_Animation_Timeline_toNow(viewer);

  hide_Animation_Timeline_Container(viewer);

  removePrimitive(viewer, primitive_CesiumOSMBuildings);
  primitive_CesiumOSMBuildings = undefined;

  // remove the Building Foorprint.
  viewer.dataSources.remove(dataSource_BuildingFootprint, true);
};
