import { ConsoleLog } from '../utils';
import Cesium from '../utils/cesium/Cesium';
import imgCesiumLogo from './assets/images/Cesium_Logo_Color.jpg';

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

const entity_polygon_wyoming = new Cesium.Entity({
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
    // height: 0, // if i set height, the surface go wrong. if i don't set it, the outline can't be seen.
    // I don't need to set heightReference to Cesium.HeightReference.CLAMP_TO_GROUND, and it be clamped to the terrain while the default value is HeightReference.NONE. it's strange.
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    material: Cesium.Color.RED.withAlpha(0.5),
    outline: true,
    outlineColor: Cesium.Color.BLACK,
    outlineWidth: 5,
  },
});

const entity_polygon_green = new Cesium.Entity({
  name: 'Green extruded polygon',
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([
      -108.0, 52.0,
      -100.0, 52.0,
      -104.0, 50.0,
    ]),
    extrudedHeight: 500000.0,
    material: Cesium.Color.GREEN.withAlpha(0.7),
    closeTop: false,
    closeBottom: false,
  },
});

const entity_polygon_textured = new Cesium.Entity({
  name: 'Textured polygon with per-position heights and custom texture coordinates',
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
      -88.4, 43.4, 50000,
      -88.4, 40, 50000,
      -84.2, 41.0, 50000,
      -78.0, 40, 50000,
      -78.0, 43.4, 50000,
    ]),
    /* textureCoordinates: { // TODO still not understand how textureCoordinates run???
      positions: [
        new Cesium.Cartesian2(0, 1),
        new Cesium.Cartesian2(0, 0),
        // new Cesium.Cartesian2(0.5, 0),
        new Cesium.Cartesian2(1, 0),
        new Cesium.Cartesian2(1, 2),
      ],
    }, */
    perPositionHeight: true,
    // extrudedHeight: 0,
    material: imgCesiumLogo,
  },
});

const entity_polygon_textured_withHeight = new Cesium.Entity({
  name: 'Extruded textured polygon with per-position heights and custom texture coordinates',
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
      -88.4, 39.4, 50000,
      -88.4, 36, 30000,
      -84.2, 37.0, 35000,
      -78.0, 36, 30000,
      -78.0, 39.4, 50000,
    ]),
    textureCoordinates: {
      positions: [
        new Cesium.Cartesian2(0, 1),
        new Cesium.Cartesian2(0, 0),
        new Cesium.Cartesian2(0.5, 0),
        new Cesium.Cartesian2(1, 0),
        new Cesium.Cartesian2(1, 1),
      ],
    },
    perPositionHeight: true,
    extrudedHeight: 0,
    material: imgCesiumLogo,
  },
});

const entity_polygon_textured_withHoles = new Cesium.Entity({
  name: 'Textured polygon with per-position heights, holes and custom texture coordinates',
  polygon: {
    hierarchy: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        -88.4, 35.4, 50000,
        -88.4, 32, 30000,
        -84.2, 33.0, 35000,
        -78.0, 32, 30000,
        -78.0, 35.4, 50000,
      ]),
      holes: [
        {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -86, 35, 90000,
            -86, 33.5, 90000,
            -84.5, 33.5, 90000,
            -84.5, 35, 90000,
          ]),
        },
      ],
    },
    textureCoordinates: {
      positions: [
        new Cesium.Cartesian2(0, 1),
        new Cesium.Cartesian2(0, 0),
        new Cesium.Cartesian2(0.5, 0),
        new Cesium.Cartesian2(1, 0),
        new Cesium.Cartesian2(1, 1),
      ],
      holes: [
        {
          positions: [
            new Cesium.Cartesian2(0.2, 0.8),
            new Cesium.Cartesian2(0.2, 0.6),
            new Cesium.Cartesian2(0.4, 0.6),
            new Cesium.Cartesian2(0.4, 0.8),
          ],
        },
      ],
    },
    perPositionHeight: true,
    extrudedHeight: 0,
    material: imgCesiumLogo,
    outline: true,
    outlineColor: Cesium.Color.BLACK,
    outlineWidth: 30,
  },
});

const entity_polygon_withHoles = new Cesium.Entity({
  name: 'Blue polygon with holes',
  polygon: {
    hierarchy: {
      positions: Cesium.Cartesian3.fromDegreesArray([
        -70.7, -7.1,
        -61.6, -7.1,
        -61.6, 1.4,
        -70.7, 1.4,
      ]),
      holes: [
        {
          positions: Cesium.Cartesian3.fromDegreesArray([
            -69.30, -6.24,
            -62.84, -6.24,
            -62.84, 0.43,
            -69.30, 0.43,
          ]),
          holes: [
            {
              positions: Cesium.Cartesian3.fromDegreesArray([
                -67.93, -4.87,
                -63.94, -4.87,
                -63.94, -0.74,
                -67.93, -0.74,
              ]),
              holes: [
                {
                  positions: Cesium.Cartesian3.fromDegreesArray([
                    -66.88, -3.62,
                    -64.86, -3.62,
                    -64.86, -1.62,
                    -66.88, -1.62,
                  ]),
                },
              ],
            },
          ],
        },
      ],
    },
    material: Cesium.Color.BLUE.withAlpha(0.5),
    height: 10000,
    outline: true, // height is required for outline to display
  },
});

const entity_polygon_vertical = new Cesium.Entity({
  name: 'Cyan vertical polygon',
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
      -85.0, 45.0, 0.0,
      -80.0, 45.0, 500000.0,
      -75.0, 45.0, 0.0,
    ]),
    perPositionHeight: true,
    material: Cesium.Color.CYAN.withAlpha(0.5),
    outline: true,
    outlineColor: Cesium.Color.BLACK,
  },
});

const entity_polygon_withArcType_NONE = new Cesium.Entity({
  name: 'Polygon edges follow straight line that does not conform to the surface of the ellipsoid.',
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([
      -120.0, 67.0,
      -80.0, 67.0,
      -80.0, 72.0,
      -120.0, 72.0,
    ]),
    extrudedHeight: 50000,
    material: Cesium.Color.PURPLE,
    outline: true,
    outlineColor: Cesium.Color.MAGENTA,
    // arcType: Cesium.ArcType.NONE,
  },
});
const entity_polygon_withArcType_GEODESIC = new Cesium.Entity({
  name: 'Polygon edges follow geodesic path',
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([
      -120.0, 61.0,
      -80.0, 61.0,
      -80.0, 66.0,
      -120.0, 66.0,
    ]),
    extrudedHeight: 50000,
    material: Cesium.Color.PURPLE,
    outline: true,
    outlineColor: Cesium.Color.MAGENTA,
    arcType: Cesium.ArcType.GEODESIC, // TODO not quite understand the meaning of these three ArcType. Follow up.
  },
});
const entity_polygon_withArcType_RHUMB = new Cesium.Entity({
  name: 'Polygon edges follow rhumb path',
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([
      -120.0, 55.0,
      -80.0, 55.0,
      -80.0, 60.0,
      -120.0, 60.0,
    ]),
    extrudedHeight: 50000,
    material: Cesium.Color.PURPLE,
    outline: true,
    outlineColor: Cesium.Color.MAGENTA,
    arcType: Cesium.ArcType.RHUMB,
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

const entity_corridor_red = new Cesium.Entity({
  name: 'Red corridor on surface with rounded corners',
  corridor: {
    // TODO default heightReference is HeightReference.NONE, but it's still clamp to the terrain.
    positions: Cesium.Cartesian3.fromDegreesArray([
      -100.0, 30.0,
      -105.0, 30.0,
      -105.0, 25.0,
    ]),
    width: 200000.0,
    material: Cesium.Color.RED.withAlpha(0.5),
  },
});

const entity_corridor_green = new Cesium.Entity({
  name: 'Green corridor at height with mitered corners and outline',
  corridor: {
    positions: Cesium.Cartesian3.fromDegreesArray([
      -90.0, 30.0,
      -95.0, 30.0,
      -95.0, 25.0,
    ]),
    height: 100000.0,
    width: 200000.0,
    cornerType: Cesium.CornerType.MITERED,
    material: Cesium.Color.GREEN,
    outline: true, // height required for outlines to display
  },
});

const entity_corridor_blue = new Cesium.Entity({
  name: 'Blue extruded corridor with beveled corners and outline',
  corridor: {
    positions: Cesium.Cartesian3.fromDegreesArray([
      -80.0, 30.0,
      -85.0, 30.0,
      -85.0, 25.0,
    ]),
    height: 100000.0,
    extrudedHeight: 200000.0,
    width: 200000.0,
    cornerType: Cesium.CornerType.BEVELED,
    material: Cesium.Color.BLUE.withAlpha(0.5),
    outline: true, // height or extrudedHeight must be set for outlines to display
    outlineColor: Cesium.Color.WHITE,
  },
});

const entity_cylinder_green = new Cesium.Entity({
  name: 'Green cylinder with black outline',
  position: Cesium.Cartesian3.fromDegrees(-90.0, 45.0, 200000.0),
  cylinder: {
    length: 400000.0,
    topRadius: 200000.0,
    bottomRadius: 200000.0,
    material: Cesium.Color.GREEN.withAlpha(0.5),
    outline: true,
    outlineColor: Cesium.Color.DARKGREEN,
  },
});

const entity_cone_red = new Cesium.Entity({
  name: 'Red cone',
  position: Cesium.Cartesian3.fromDegrees(-97.0, 45.0, 200000.0),
  cylinder: {
    length: 400000.0,
    topRadius: 0.0,
    bottomRadius: 200000.0,
    material: Cesium.Color.RED,
    outline: true,
    outlineColor: Cesium.Color.DARKRED,
  },
});

let added_entity_polygon_wyoming;
let added_entity_box_blue;
let added_entity_box_red;
let added_entity_box_outlineOnly;
let added_entity_circle_green;
let added_entity_ellipse_red;
let added_entity_ellipse_blue_extruded;
let added_entity_corridor_red;
let added_entity_corridor_green;
let added_entity_corridor_blue;
let added_entity_cylinder_green;
let added_entity_cone_red;
let added_entity_polygon_green;
let added_entity_polygon_textured;
let added_entity_polygon_textured_withHeight;
let added_entity_polygon_textured_withHoles;
let added_entity_polygon_withHoles;
let added_entity_polygon_vertical;
let added_entity_polygon_withArcType_NONE;
let added_entity_polygon_withArcType_GEODESIC;
let added_entity_polygon_withArcType_RHUMB;

export const demoShowEntities = (viewer) => {
  added_entity_polygon_wyoming = viewer.entities.add(entity_polygon_wyoming);
  added_entity_box_blue = viewer.entities.add(entity_box_blue);
  added_entity_box_red = viewer.entities.add(entity_box_red);
  added_entity_box_outlineOnly = viewer.entities.add(entity_box_outlineOnly);
  added_entity_circle_green = viewer.entities.add(entity_circle_green);
  added_entity_ellipse_red = viewer.entities.add(entity_ellipse_red);
  added_entity_ellipse_blue_extruded = viewer.entities.add(entity_ellipse_blue_extruded);
  added_entity_corridor_red = viewer.entities.add(entity_corridor_red);
  added_entity_corridor_green = viewer.entities.add(entity_corridor_green);
  added_entity_corridor_blue = viewer.entities.add(entity_corridor_blue);
  added_entity_cylinder_green = viewer.entities.add(entity_cylinder_green);
  added_entity_cone_red = viewer.entities.add(entity_cone_red);
  added_entity_polygon_green = viewer.entities.add(entity_polygon_green);
  added_entity_polygon_textured = viewer.entities.add(entity_polygon_textured);
  added_entity_polygon_textured_withHeight = viewer.entities.add(entity_polygon_textured_withHeight);
  added_entity_polygon_textured_withHoles = viewer.entities.add(entity_polygon_textured_withHoles);
  added_entity_polygon_withHoles = viewer.entities.add(entity_polygon_withHoles);
  added_entity_polygon_vertical = viewer.entities.add(entity_polygon_vertical);
  added_entity_polygon_withArcType_NONE = viewer.entities.add(entity_polygon_withArcType_NONE);
  added_entity_polygon_withArcType_GEODESIC = viewer.entities.add(entity_polygon_withArcType_GEODESIC);
  added_entity_polygon_withArcType_RHUMB = viewer.entities.add(entity_polygon_withArcType_RHUMB);

  viewer.zoomTo(viewer.entities);
};

export const destroyDemoShowEntities = (viewer) => {
  viewer.entities.remove(added_entity_polygon_wyoming);
  viewer.entities.remove(added_entity_box_blue);
  viewer.entities.remove(added_entity_box_red);
  viewer.entities.remove(added_entity_box_outlineOnly);
  viewer.entities.remove(added_entity_circle_green);
  viewer.entities.remove(added_entity_ellipse_red);
  viewer.entities.remove(added_entity_ellipse_blue_extruded);
  viewer.entities.remove(added_entity_corridor_red);
  viewer.entities.remove(added_entity_corridor_green);
  viewer.entities.remove(added_entity_corridor_blue);
  viewer.entities.remove(added_entity_cylinder_green);
  viewer.entities.remove(added_entity_cone_red);
  viewer.entities.remove(added_entity_polygon_green);
  viewer.entities.remove(added_entity_polygon_textured);
  viewer.entities.remove(added_entity_polygon_textured_withHeight);
  viewer.entities.remove(added_entity_polygon_textured_withHoles);
  viewer.entities.remove(added_entity_polygon_withHoles);
  viewer.entities.remove(added_entity_polygon_vertical);
  viewer.entities.remove(added_entity_polygon_withArcType_NONE);
  viewer.entities.remove(added_entity_polygon_withArcType_GEODESIC);
  viewer.entities.remove(added_entity_polygon_withArcType_RHUMB);

  added_entity_polygon_wyoming = undefined;
  added_entity_box_blue = undefined;
  added_entity_box_red = undefined;
  added_entity_box_outlineOnly = undefined;
  added_entity_circle_green = undefined;
  added_entity_ellipse_red = undefined;
  added_entity_ellipse_blue_extruded = undefined;
  added_entity_corridor_red = undefined;
  added_entity_corridor_green = undefined;
  added_entity_corridor_blue = undefined;
  added_entity_cylinder_green = undefined;
  added_entity_cone_red = undefined;
  added_entity_polygon_green = undefined;
  added_entity_polygon_textured = undefined;
  added_entity_polygon_textured_withHeight = undefined;
  added_entity_polygon_textured_withHoles = undefined;
  added_entity_polygon_withHoles = undefined;
  added_entity_polygon_vertical = undefined;
  added_entity_polygon_withArcType_NONE = undefined;
  added_entity_polygon_withArcType_GEODESIC = undefined;
  added_entity_polygon_withArcType_RHUMB = undefined;
};
