import Cesium from '../utils/cesium/Cesium';
import {
  display_Animation_Timeline_Container, hide_Animation_Timeline_Container, addOSMBuildings, removePrimitive, adjust_Animation_Timeline_toNow,
} from '../utils/cesium/utils';

let primitive_CesiumOSMBuildings;
let dataSource_BuildingFootprint;

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
 *
 * @param {Viewer} viewer
 */
export async function demoProposedBuilding(viewer) {
  display_Animation_Timeline_Container(viewer);

  primitive_CesiumOSMBuildings = addOSMBuildings(viewer);

  /* viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-104.9965, 39.74248, 4000),
  }); */
  dataSource_BuildingFootprint = await addBuildingFootprint(viewer);
  console.log('dataSource_BuildingFootprint:', dataSource_BuildingFootprint);
}

export const destroyDemoProposedBuilding = (viewer) => {
  adjust_Animation_Timeline_toNow(viewer);

  hide_Animation_Timeline_Container(viewer);

  removePrimitive(viewer, primitive_CesiumOSMBuildings);
  primitive_CesiumOSMBuildings = undefined;

  // remove the Building Foorprint.
  viewer.dataSources.remove(dataSource_BuildingFootprint, true);
};
