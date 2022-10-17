import { ConsoleLog } from '../utils';
import Cesium from '../utils/cesium/Cesium';

const positions_wyoming = Cesium.Cartesian3.fromDegreesArray([
  -109.080842, 45.002073,
  -105.91517, 45.002073,
  -104.058488, 44.996596,
  -104.053011, 43.002989,
  -104.053011, 41.003906,
  -105.728954, 40.998429,
  -107.919731, 41.003906,
  -109.04798, 40.998429,
  -111.047063, 40.998429,
  -111.047063, 42.000709,
  -111.047063, 44.476286,
  -111.05254, 45.002073]);

const entity_polygon = new Cesium.Entity({
  name: 'Wyoming boundary',
  polygon: {
    hierarchy: new Cesium.PolygonHierarchy(positions_wyoming),
    /* hierarchy: Cesium.Cartesian3.fromDegreesArray([
      -109.080842, 45.002073,
      -105.91517, 45.002073,
      -104.058488, 44.996596,
      -104.053011, 43.002989,
      -104.053011, 41.003906,
      -105.728954, 40.998429,
      -107.919731, 41.003906,
      -109.04798, 40.998429,
      -111.047063, 40.998429,
      -111.047063, 42.000709,
      -111.047063, 44.476286,
      -111.05254, 45.002073]), */
    // In the doc, the default value of property height is 0, but polygon surface would go wrong if I declare it and set to 0.
    // https://cesium.com/learn/cesiumjs/ref-doc/PolygonGraphics.html#.ConstructorOptions
    // height: 0,
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // didn't notice the difference in the display effect between CLAMP_TO_GROUND and RELATIVE_TO_GROUND.
    material: Cesium.Color.RED.withAlpha(0.5),
    outline: true,
    outlineColor: Cesium.Color.BLACK,
    outlineWidth: 5,
  },
});

const entity_box_blue = new Cesium.Entity({
  name: 'Blue box',
  position: Cesium.Cartesian3.fromDegrees(-114.0, 37.0, 300000.0),
  box: {
    dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
    material: Cesium.Color.BLUE,
  },
});

const entity_box_red = new Cesium.Entity({
  name: 'Red box with black outline',
  position: Cesium.Cartesian3.fromDegrees(-107.0, 37.0, 300000.0),
  box: {
    dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
    material: Cesium.Color.RED.withAlpha(0.5),
    outline: true,
    outlineColor: Cesium.Color.BLACK,
    outlineWidth: 5,
  },
});

const entity_box_outlineOnly = new Cesium.Entity({
  name: 'Yellow box outline',
  position: Cesium.Cartesian3.fromDegrees(-100.0, 37.0, 300000.0),
  box: {
    dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
    fill: false,
    outline: true,
    outlineColor: Cesium.Color.YELLOW,
  },
});

const entity_circle_green = new Cesium.Entity({
  name: 'Green circle at height with outline',
  position: Cesium.Cartesian3.fromDegrees(-111.0, 40.0, 100000.0),
  ellipse: {
    semiMinorAxis: 300000.0,
    semiMajorAxis: 300000.0,
    height: 200000.0, // if the height not set, the ellipse would be clamp to terrain, seems the height setted in the Entity.position be of no effect.
    material: Cesium.Color.GREEN,
    outline: true, // height must be set for outline to display
  },
});

const entity_ellipse_red = new Cesium.Entity({
  name: 'Red ellipse on surface',
  position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0),
  ellipse: {
    semiMinorAxis: 250000.0,
    semiMajorAxis: 400000.0,
    // heightReference: Cesium.HeightReference.NONE, // whether set heightReference or not, the ellipse would clamp to the terrain.
    material: Cesium.Color.RED.withAlpha(0.5),
  },
});

const entity_ellipse_blue_extruded = new Cesium.Entity({
  name: 'Blue translucent, rotated, and extruded ellipse with outline',
  position: Cesium.Cartesian3.fromDegrees(-95.0, 40.0),
  ellipse: {
    semiMinorAxis: 150000.0,
    semiMajorAxis: 300000.0,
    // height: 10000.0, heightReference: Cesium.HeightReference.NONE,
    // TODO didn't find the parameters that can set the underside clamp to the terrain.
    // but the outline of the underside is clamp to the terrain.
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // no effect.
    extrudedHeight: 200000.0,
    extrudedHeightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    rotation: Cesium.Math.toRadians(45), // A numeric property specifying the rotation of the ellipse counter-clockwise from north.
    material: Cesium.Color.BLUE.withAlpha(0.5),
    outline: true,
  },
});

let added_entity_polygon;
let added_entity_box_blue;
let added_entity_box_red;
let added_entity_box_outlineOnly;
let added_entity_circle_green;
let added_entity_ellipse_red;
let added_entity_ellipse_blue_extruded;

export const demoShowEntities = (viewer) => {
  added_entity_polygon = viewer.entities.add(entity_polygon);
  added_entity_box_blue = viewer.entities.add(entity_box_blue);
  added_entity_box_red = viewer.entities.add(entity_box_red);
  added_entity_box_outlineOnly = viewer.entities.add(entity_box_outlineOnly);
  added_entity_circle_green = viewer.entities.add(entity_circle_green);
  added_entity_ellipse_red = viewer.entities.add(entity_ellipse_red);
  added_entity_ellipse_blue_extruded = viewer.entities.add(entity_ellipse_blue_extruded);
};

export const destroyDemoShowEntities = (viewer) => {
  viewer.entities.remove(added_entity_polygon);
  viewer.entities.remove(added_entity_box_blue);
  viewer.entities.remove(added_entity_box_red);
  viewer.entities.remove(added_entity_box_outlineOnly);
  viewer.entities.remove(added_entity_circle_green);
  viewer.entities.remove(added_entity_ellipse_red);
  viewer.entities.remove(added_entity_ellipse_blue_extruded);

  added_entity_polygon = undefined;
  added_entity_box_blue = undefined;
  added_entity_box_red = undefined;
  added_entity_box_outlineOnly = undefined;
  added_entity_circle_green = undefined;
  added_entity_ellipse_red = undefined;
  added_entity_ellipse_blue_extruded = undefined;
};
