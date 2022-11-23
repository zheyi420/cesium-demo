// the Demo Show Entities
// detail: https://cesium.com/learn/cesiumjs-learn/cesiumjs-creating-entities/

import { ConsoleLog } from '../utils';
import { onChanged } from '../utils/cesium';
import Cesium from '../utils/cesium/Cesium';
import imgCesiumLogo from './assets/images/Cesium_Logo_Color.jpg';
import imgRickMorty from './assets/images/rick-and-morty-portal.jpg';

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
  name: 'polygon',
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
    // I don't need to set heightReference to Cesium.HeightReference.CLAMP_TO_GROUND, it'll be clamped to the terrain while the default value is HeightReference.NONE. it's strange.
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    material: Cesium.Color.RED.withAlpha(0.5),
    outline: true,
    outlineColor: Cesium.Color.BLACK,
    outlineWidth: 5,
  },
  // more detail about description, iframe
  // https://cesium.com/learn/cesiumjs-learn/cesiumjs-creating-entities/#selection-and-description
  // https://web.dev/sandboxed-iframes/
  // TODO need to adjust the style height of the ele iframe
  description: `
    <img
      width="50%"
      style="float:left; margin: 1em 1em 1em 0;"
      src="/img/Flag_of_Wyoming.png"/>
    <p>
      Wyoming is a state in the mountain region of the Western United States.
    </p>
    <p>
      Wyoming is the 10th most extensive, but the least populous 
      and the second least densely populated of the 50 United 
      States. The western two thirds of the state is covered mostly 
      with the mountain ranges and rangelands in the foothills of 
      the eastern Rocky Mountains, while the eastern third of the 
      state is high elevation prairie known as the High Plains. 
      Cheyenne is the capital and the most populous city in Wyoming, 
      with a population estimate of 63,624 in 2017.
    </p>
    <p>
      Source: 
      <a
        style="color: WHITE"
        target="_blank"
        href="http://en.wikipedia.org/wiki/Wyoming"
      >
        Wikpedia
      </a>
    </p>`,
});

const entity_polygon_green = new Cesium.Entity({
  name: 'polygon',
  description: 'Green extruded polygon',
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
  name: 'polygon',
  description: 'Textured polygon with per-position heights and custom texture coordinates',
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
  name: 'polygon',
  description: 'Extruded textured polygon with per-position heights and custom texture coordinates',
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
  name: 'polygon',
  description: 'Textured polygon with per-position heights, holes and custom texture coordinates',
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
  name: 'polygon',
  description: 'Blue polygon with holes',
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
  name: 'polygon',
  description: 'Cyan vertical polygon',
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
  name: 'polygon',
  description: 'Polygon edges follow straight line that does not conform to the surface of the ellipsoid.',
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
  name: 'polygon',
  description: 'Polygon edges follow geodesic path',
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
  name: 'polygon',
  description: 'Polygon edges follow rhumb or loxodrome path',
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
  name: 'box',
  description: 'Blue box',
  position: Cesium.Cartesian3.fromDegrees(-114.0, 37.0, 300000.0),
  box: {
    dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
    material: Cesium.Color.BLUE,
  },
});

const entity_box_red = new Cesium.Entity({
  name: 'box',
  description: 'Red box with black outline',
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
  name: 'box',
  description: 'Yellow box outline',
  position: Cesium.Cartesian3.fromDegrees(-100.0, 37.0, 300000.0),
  box: {
    dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
    fill: false,
    outline: true,
    outlineColor: Cesium.Color.YELLOW,
  },
});

const entity_circle_green = new Cesium.Entity({
  name: 'ellipse',
  description: 'Green circle at height with outline',
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
  name: 'ellipse',
  description: 'Red ellipse on surface',
  position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0),
  ellipse: {
    semiMinorAxis: 250000.0,
    semiMajorAxis: 400000.0,
    // heightReference: Cesium.HeightReference.NONE, // whether set heightReference or not, the ellipse would clamp to the terrain.
    material: Cesium.Color.RED.withAlpha(0.5), // a ColorMaterialProperty is created for us automatically on assignment.
  },
});

const { ellipse } = entity_ellipse_red;

ellipse.material = imgRickMorty; // a ImageMaterialProperty is created for us automatically on assignment.

// For more complex materials, we need to create a MaterialProperty instance ourselves.
const entity_ellipse_checkerboard = new Cesium.Entity({
  name: 'ellipse',
  description: 'Checkerboard ellipse on surface',
  position: Cesium.Cartesian3.fromDegrees(-103.0, 35.0),
  ellipse: {
    semiMinorAxis: 250000.0,
    semiMajorAxis: 400000.0,
    material: new Cesium.CheckerboardMaterialProperty({
      evenColor: Cesium.Color.WHITE,
      oddColor: Cesium.Color.BLACK,
      repeat: new Cesium.Cartesian2(4, 4),
    }),
  },
});

const entity_ellipse_stripe = new Cesium.Entity({
  name: 'ellipse',
  description: 'Stripe ellipse on surface',
  position: Cesium.Cartesian3.fromDegrees(-103.0, 30.0),
  ellipse: {
    semiMinorAxis: 250000.0,
    semiMajorAxis: 400000.0,
    material: new Cesium.StripeMaterialProperty({
      evenColor: Cesium.Color.WHITE,
      oddColor: Cesium.Color.BLACK,
      repeat: 32,
    }),
  },
});

const entity_ellipse_grid = new Cesium.Entity({
  name: 'ellipse',
  description: 'Grid ellipse on surface',
  position: Cesium.Cartesian3.fromDegrees(-103.0, 25.0),
  ellipse: {
    semiMinorAxis: 250000.0,
    semiMajorAxis: 400000.0,
    material: new Cesium.GridMaterialProperty({
      color: Cesium.Color.YELLOW,
      cellAlpha: 0.2,
      lineCount: new Cesium.Cartesian2(8, 8),
      lineThickness: new Cesium.Cartesian2(2.0, 2.0),
    }),
  },
});

// TODO can't get a ellipse with outline only and also can be clamped to the terrain.
// Entity geometry outlines are unsupported on terrain. Outlines will be disabled.
// To enable outlines, disable geometry terrain clamping by explicitly setting height to 0.
const entity_ellipse_outlineOnly = new Cesium.Entity({
  name: 'ellipse',
  description: 'ellipse with outline only',
  position: Cesium.Cartesian3.fromDegrees(-103.0, 20.0),
  ellipse: {
    semiMinorAxis: 250000.0,
    semiMajorAxis: 400000.0,
    fill: false,
    // height: 0,
    // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    // outline relies on the outlineColor and outlineWidth properties.
    // outlineWidth only works on non-Windows systems, such as Android, iOS, Linux, and OS X.
    // On Windows systems, outlines will always have a width of 1.
    // This is due to a limitation of how WebGL is implemented on Windows.
    outline: true,
    outlineColor: Cesium.Color.YELLOW,
    outlineWidth: 10.0,
  },
});

const entity_ellipse_blue_extruded = new Cesium.Entity({
  name: 'ellipse',
  description: 'Blue translucent, rotated, and extruded ellipse with outline',
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
  name: 'corridor',
  description: 'Red corridor on surface with rounded corners',
  corridor: {
    // TODO default heightReference is HeightReference.NONE, but it's still clamp to the terrain.
    positions: Cesium.Cartesian3.fromDegreesArray([
      -90.0, 30.0,
      -95.0, 30.0,
      -95.0, 25.0,
    ]),
    width: 200000.0,
    material: Cesium.Color.RED.withAlpha(0.5),
  },
});

const entity_corridor_green = new Cesium.Entity({
  name: 'corridor',
  description: 'Green corridor at height with mitered corners and outline',
  corridor: {
    positions: Cesium.Cartesian3.fromDegreesArray([
      -85.0, 30.0,
      -90.0, 30.0,
      -90.0, 25.0,
    ]),
    height: 100000.0,
    width: 200000.0,
    cornerType: Cesium.CornerType.MITERED,
    material: Cesium.Color.GREEN,
    outline: true, // height required for outlines to display
  },
});

const entity_corridor_blue = new Cesium.Entity({
  name: 'corridor',
  description: 'Blue extruded corridor with beveled corners and outline',
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
  name: 'cylinder',
  description: 'Green cylinder with black outline',
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
  name: 'cylinder',
  description: 'Red cone',
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

const entity_polyline_withArcType_NONE = new Cesium.Entity({
  name: 'polyline',
  description: 'Polyline segments follow straight line that does not conform to the surface of the ellipsoid.',
  polyline: {
    positions: Cesium.Cartesian3.fromDegreesArray([16, 70, 80, 70]),
    width: 5,
    material: Cesium.Color.GREEN,
    clampToGround: true,
    zIndex: 1,
  },
});

const entity_polyline_withArcType_GEODESIC = new Cesium.Entity({
  name: 'polyline',
  description: 'Polyline segments follow geodesic path',
  polyline: {
    positions: Cesium.Cartesian3.fromDegreesArray([16, 70, 80, 70]),
    width: 10,
    material: Cesium.Color.RED,
    clampToGround: true,
    zIndex: 0,
    arcType: Cesium.ArcType.GEODESIC,
  },
});

const entity_polyline_withArcType_RHUMB = new Cesium.Entity({
  name: 'polyline',
  description: 'Polyline segments follow rhumb or loxodrome path',
  polyline: {
    positions: Cesium.Cartesian3.fromDegreesArray([16, 70, 80, 70]),
    width: 5,
    material: Cesium.Color.DEEPSKYBLUE,
    clampToGround: true,
    arcType: Cesium.ArcType.RHUMB,
  },
});

const entity_polyline_orange_outlined = new Cesium.Entity({
  name: 'polyline',
  description: 'Orange line with black outline at height and following the surface',
  polyline: {
    positions: Cesium.Cartesian3.fromDegreesArrayHeights([16, 65, 250000, 80, 65, 250000]),
    width: 5,
    material: new Cesium.PolylineOutlineMaterialProperty({
      color: Cesium.Color.ORANGE,
      outlineWidth: 2,
      outlineColor: Cesium.Color.BLACK,
    }),
  },
});

const entity_polyline_purple_arrow = new Cesium.Entity({
  name: 'polyline',
  description: 'Purple straight arrow at height',
  polyline: {
    positions: Cesium.Cartesian3.fromDegreesArrayHeights([16, 60, 500000, 80, 60, 500000]),
    width: 10,
    arcType: Cesium.ArcType.NONE,
    material: new Cesium.PolylineArrowMaterialProperty(
      Cesium.Color.PURPLE,
    ),
  },
});

const entity_polyline_dashed = new Cesium.Entity({
  name: 'polyline',
  description: 'CYAN dashed line',
  polyline: {
    positions: Cesium.Cartesian3.fromDegreesArrayHeights([16, 55, 500000, 80, 55, 500000]),
    width: 4,
    material: new Cesium.PolylineDashMaterialProperty({
      color: Cesium.Color.CYAN,
      gapColor: Cesium.Color.TRANSPARENT,
      dashLength: 20,
      // TODO dashPattern: A numeric Property specifying a 16 bit pattern for the dash?? what's this mean? a Bit Pattern?
      dashPattern: 255,
    }),
  },
});

const entity_polyline_glow = new Cesium.Entity({
  name: 'polyline',
  description: 'Glowing blue line on the surface',
  polyline: {
    positions: Cesium.Cartesian3.fromDegreesArray([16, 50, 80, 50]),
    width: 10,
    material: new Cesium.PolylineGlowMaterialProperty({
      glowPower: 0.5,
      taperPower: 0.5,
      color: Cesium.Color.CORNFLOWERBLUE,
    }),
    clampToGround: true,
  },
});

const computeCircle = (radius) => {
  const positions = [];
  for (let i = 0; i < 360; i++) {
    const radians = Cesium.Math.toRadians(i);
    positions.push(
      new Cesium.Cartesian2(
        radius * Math.cos(radians),
        radius * Math.sin(radians),
      ),
    );
  }
  return positions;
};

/**
 * computue the coordinate of 7 outer vertex and 7 inner vertex.
 * @param {Number} arms - the number of outer vertex.
 * @param {Number} rOuter - the radius of the outer vertex.
 * @param {Number} rInner - the radius of the inner vertex.
 * @returns {Array}
 */
const computeStar = (arms, rOuter, rInner) => {
  const angle = Math.PI / arms;
  const length = 2 * arms;
  const positions = new Array(length);
  for (let i = 0; i < length; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    positions[i] = new Cesium.Cartesian2(
      Math.cos(i * angle) * r,
      Math.sin(i * angle) * r,
    );
  }
  return positions;
};

const entity_polylineVolume_tube = new Cesium.Entity({
  name: 'polylineVolume',
  description: 'Red tube with rounded corners',
  polylineVolume: {
    positions: Cesium.Cartesian3.fromDegreesArray([
      153, 62,
      153, 68,
      133, 68,
    ]),
    shape: computeCircle(60000.0), // TODO why the return circle surround the origin of coordinates.
    material: Cesium.Color.RED,
  },
});

const entity_polylineVolume_box = new Cesium.Entity({
  name: 'polylineVolume',
  description: 'Green box with beveled corners and outline',
  polylineVolume: {
    positions: Cesium.Cartesian3.fromDegreesArrayHeights([
      123, 62, 0.0,
      123, 68, 100000.0,
      103, 68, 0.0,
    ]),
    shape: [
      new Cesium.Cartesian2(-50000, -50000),
      new Cesium.Cartesian2(50000, -50000),
      new Cesium.Cartesian2(50000, 50000),
      new Cesium.Cartesian2(-50000, 50000),
    ],
    cornerType: Cesium.CornerType.BEVELED,
    material: Cesium.Color.GREEN.withAlpha(0.5),
    outline: true,
    outlineColor: Cesium.Color.BLACK,
  },
});

const entity_polylineVolume_star = new Cesium.Entity({
  name: 'polylineVolume',
  description: 'Blue star with mitered corners and outline',
  polylineVolume: {
    positions: Cesium.Cartesian3.fromDegreesArrayHeights([
      100, 62, 0.0,
      100, 68, 100000.0,
      83, 68, 200000.0,
    ]),
    shape: computeStar(7, 70000, 50000),
    cornerType: Cesium.CornerType.MITERED,
    material: Cesium.Color.BLUE,
  },
});

const entity_rectangle_red = new Cesium.Entity({
  name: 'rectangle',
  description: 'Red translucent rectangle',
  rectangle: {
    coordinates: Cesium.Rectangle.fromDegrees(22.85, 40.84, 57.12, 47.98),
    material: Cesium.Color.RED.withAlpha(0.5),
  },
});

const entity_rectangle_translucent_green = new Cesium.Entity({
  name: 'rectangle',
  description: 'Green translucent, rotated, and extruded rectangle at height with outline',
  rectangle: {
    coordinates: Cesium.Rectangle.fromDegrees(38.40, 24.24, 48.47, 32.69),
    material: Cesium.Color.GREEN.withAlpha(0.5),
    rotation: Cesium.Math.toRadians(45),
    extrudedHeight: 300000.0,
    height: 100000.0,
    outline: true, // height must be set for outline to display
    outlineColor: Cesium.Color.BLACK,
  },
});

let rotation = Cesium.Math.toRadians(30);

const getRotationValue = () => {
  rotation += 0.005;
  return rotation;
};

const entity_rectangle_rotating_withTexture = new Cesium.Entity({
  name: 'rectangle',
  description: 'Rotating rectangle with rotating texture coordinate',
  rectangle: {
    coordinates: Cesium.Rectangle.fromDegrees(43.28, 16.67, 57.34, 21.77),
    material: imgCesiumLogo,
    // TODO doc say property rotation specifying the rotation that is clockwise from north but say property stRotation specifying counter-clockwise.
    // Seems the property rotation specifying the rotation of the rectangle counter-clockwise from north.
    rotation: new Cesium.CallbackProperty(getRotationValue, false),
    stRotation: new Cesium.CallbackProperty(getRotationValue, false),
    classificationType: Cesium.ClassificationType.TERRAIN,
  },
});

const entity_ellipsoid_blue = new Cesium.Entity({
  name: 'ellipsoid',
  description: 'Blue ellipsoid',
  position: Cesium.Cartesian3.fromDegrees(-5, 22.18, 300000.0),
  // orientation: // TODO how to set this? didn't find the doc about it.
  ellipsoid: {
    radii: new Cesium.Cartesian3(200000.0, 200000.0, 300000.0),
    material: Cesium.Color.BLUE,
  },
});

const entity_sphere_red = new Cesium.Entity({
  name: 'ellipsoid',
  description: 'Red sphere with black outline',
  position: Cesium.Cartesian3.fromDegrees(0, 22.18, 300000.0),
  ellipsoid: {
    radii: new Cesium.Cartesian3(300000.0, 300000.0, 300000.0),
    material: Cesium.Color.RED.withAlpha(0.5),
    outline: true,
    outlineColor: Cesium.Color.BLACK,
  },
});

const entity_ellipsoid_outlineOnly = new Cesium.Entity({
  name: 'ellipsoid',
  description: 'Yellow ellipsoid outline',
  position: Cesium.Cartesian3.fromDegrees(5, 21.69, 300000.0),
  ellipsoid: {
    radii: new Cesium.Cartesian3(200000.0, 200000.0, 300000.0),
    fill: false,
    outline: true,
    outlineColor: Cesium.Color.YELLOW,
    slicePartitions: 24,
    stackPartitions: 36,
  },
});

const entity_wall_red_height = new Cesium.Entity({
  name: 'wall',
  description: 'Red wall at height',
  wall: {
    positions: Cesium.Cartesian3.fromDegreesArrayHeights([
      15.29, 13.15, 200000.0,
      36.56, 13.15, 200000.0,
    ]),
    minimumHeights: [100000.0, 100000.0],
    material: Cesium.Color.RED,
  },
});

const entity_wall_green_surface = new Cesium.Entity({
  name: 'wall',
  description: 'Green wall from surface with outline',
  wall: {
    positions: Cesium.Cartesian3.fromDegreesArrayHeights([
      15.29, -2.54, 100000.0,
      36.56, -2.54, 100000.0,
      36.56, 6.57, 100000.0,
      15.29, 6.57, 100000.0,
      15.29, -2.54, 100000.0,
    ]),
    material: Cesium.Color.GREEN,
    outline: true,
  },
});

const entity_wall_blue_sawtooth = new Cesium.Entity({
  name: 'wall',
  description: 'Blue wall with sawtooth heights and outline',
  wall: {
    positions: Cesium.Cartesian3.fromDegreesArray([
      15.29, -10,
      17.29, -10,
      19.29, -10,
      21.29, -10,
      23.29, -10,
      25.29, -10,
      27.29, -10,
      29.29, -10,
      31.29, -10,
      33.29, -10,
      35.29, -10,
    ]),
    maximumHeights: [100000, 200000, 100000, 200000, 100000, 200000, 100000, 200000, 100000, 200000, 100000],
    minimumHeights: [0, 100000, 0, 100000, 0, 100000, 0, 100000, 0, 100000, 0],
    material: Cesium.Color.BLUE.withAlpha(0.5),
    outline: true,
    outlineColor: Cesium.Color.BLACK,
  },
});

const entities = {};

export const demoShowEntities = (viewer) => {
  viewer.entities.collectionChanged.addEventListener(onChanged);

  viewer.entities.suspendEvents();

  entities.entity_polygon_wyoming = viewer.entities.add(entity_polygon_wyoming);
  entities.entity_box_blue = viewer.entities.add(entity_box_blue);
  entities.entity_box_red = viewer.entities.add(entity_box_red);
  entities.entity_box_outlineOnly = viewer.entities.add(entity_box_outlineOnly);
  entities.entity_circle_green = viewer.entities.add(entity_circle_green);
  entities.entity_ellipse_red = viewer.entities.add(entity_ellipse_red);
  entities.entity_ellipse_blue_extruded = viewer.entities.add(entity_ellipse_blue_extruded);
  entities.entity_corridor_red = viewer.entities.add(entity_corridor_red);
  entities.entity_corridor_green = viewer.entities.add(entity_corridor_green);
  entities.entity_corridor_blue = viewer.entities.add(entity_corridor_blue);
  entities.entity_cylinder_green = viewer.entities.add(entity_cylinder_green);
  entities.entity_cone_red = viewer.entities.add(entity_cone_red);
  entities.entity_polygon_green = viewer.entities.add(entity_polygon_green);
  entities.entity_polygon_textured = viewer.entities.add(entity_polygon_textured);
  entities.entity_polygon_textured_withHeight = viewer.entities.add(entity_polygon_textured_withHeight);
  entities.entity_polygon_textured_withHoles = viewer.entities.add(entity_polygon_textured_withHoles);
  entities.entity_polygon_withHoles = viewer.entities.add(entity_polygon_withHoles);
  entities.entity_polygon_vertical = viewer.entities.add(entity_polygon_vertical);
  entities.entity_polygon_withArcType_NONE = viewer.entities.add(entity_polygon_withArcType_NONE);
  entities.entity_polygon_withArcType_GEODESIC = viewer.entities.add(entity_polygon_withArcType_GEODESIC);
  entities.entity_polygon_withArcType_RHUMB = viewer.entities.add(entity_polygon_withArcType_RHUMB);
  entities.entity_polyline_withArcType_NONE = viewer.entities.add(entity_polyline_withArcType_NONE);
  entities.entity_polyline_withArcType_GEODESIC = viewer.entities.add(entity_polyline_withArcType_GEODESIC);
  entities.entity_polyline_withArcType_RHUMB = viewer.entities.add(entity_polyline_withArcType_RHUMB);
  entities.entity_polyline_orange_outlined = viewer.entities.add(entity_polyline_orange_outlined);
  entities.entity_polyline_purple_arrow = viewer.entities.add(entity_polyline_purple_arrow);
  entities.entity_polyline_dashed = viewer.entities.add(entity_polyline_dashed);
  entities.entity_polyline_glow = viewer.entities.add(entity_polyline_glow);
  entities.entity_polylineVolume_tube = viewer.entities.add(entity_polylineVolume_tube);
  entities.entity_polylineVolume_box = viewer.entities.add(entity_polylineVolume_box);
  entities.entity_polylineVolume_star = viewer.entities.add(entity_polylineVolume_star);
  entities.entity_rectangle_red = viewer.entities.add(entity_rectangle_red);
  entities.entity_rectangle_translucent_green = viewer.entities.add(entity_rectangle_translucent_green);
  entities.entity_rectangle_rotating_withTexture = viewer.entities.add(entity_rectangle_rotating_withTexture);
  entities.entity_ellipsoid_blue = viewer.entities.add(entity_ellipsoid_blue);
  entities.entity_sphere_red = viewer.entities.add(entity_sphere_red);
  entities.entity_ellipsoid_outlineOnly = viewer.entities.add(entity_ellipsoid_outlineOnly);
  entities.entity_wall_red_height = viewer.entities.add(entity_wall_red_height);
  entities.entity_wall_green_surface = viewer.entities.add(entity_wall_green_surface);
  entities.entity_wall_blue_sawtooth = viewer.entities.add(entity_wall_blue_sawtooth);
  entities.entity_ellipse_checkerboard = viewer.entities.add(entity_ellipse_checkerboard);
  entities.entity_ellipse_stripe = viewer.entities.add(entity_ellipse_stripe);
  entities.entity_ellipse_grid = viewer.entities.add(entity_ellipse_grid);
  entities.entity_ellipse_outlineOnly = viewer.entities.add(entity_ellipse_outlineOnly);

  viewer.entities.resumeEvents();

  // viewer.zoomTo(viewer.entities);
};

export const destroyDemoShowEntities = (viewer) => {
  viewer.entities.removeAll();

  for (const entity in entities) {
    if (Object.prototype.hasOwnProperty.call(entities, entity)) {
      entities[entity] = undefined;
    }
  }

  viewer.entities.collectionChanged.removeEventListener(onChanged);
};
