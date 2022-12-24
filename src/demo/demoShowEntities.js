// the Demo Show Entities
// detail: https://cesium.com/learn/cesiumjs-learn/cesiumjs-creating-entities/

import {
  addEntities, onChanged, computeStar, computeCircle, getRotationValue, animateLabel,
} from '../utils/cesium';
import { ConsoleLog } from '../utils';
import Cesium from '../utils/cesium/Cesium';
import imgCesiumLogo from './assets/images/Cesium_Logo_Color.jpg';
import imgRickMorty from './assets/images/rick-and-morty-portal.jpg';
import imgPhiladelphiaPhillies from './assets/images/Philadelphia_Phillies.png';
import img_url_Facility from './assets/images/facility.gif';
import imgCesiumLogoOverlay from './assets/images/Cesium_Logo_overlay.png';
import imgWhiteShapes from './assets/images/whiteShapes.png';

const entities = {};

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

entities.entity_polygon_wyoming = new Cesium.Entity({
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
  // [Play safely in sandboxed IFrames](https://web.dev/sandboxed-iframes/)
  // TODO need to adjust the style height of the ele iframe
  description: import.meta.env.VITE_BUILD_PATH_PREFIX === '/cesium-demo' ? `
    <img
      width="50%"
      style="float:left; margin: 1em 1em 1em 0;"
      src="/cesium-demo/img/Flag_of_Wyoming.png"/>
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
    </p>` : `
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

// ConsoleLog(typeof entities.entity_polygon_wyoming.polygon.outline); // object
// ConsoleLog(entities.entity_polygon_wyoming.polygon.outline instanceof Cesium.ConstantProperty); // true
// ConsoleLog(entities.entity_polygon_wyoming.polygon.outline instanceof Cesium.Property); // false

entities.entity_polygon_green = new Cesium.Entity({
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

entities.entity_polygon_textured = new Cesium.Entity({
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

entities.entity_polygon_textured_withHeight = new Cesium.Entity({
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

entities.entity_polygon_textured_withHoles = new Cesium.Entity({
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

entities.entity_polygon_withHoles = new Cesium.Entity({
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

entities.entity_polygon_vertical = new Cesium.Entity({
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

entities.entity_polygon_withArcType_NONE = new Cesium.Entity({
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
entities.entity_polygon_withArcType_GEODESIC = new Cesium.Entity({
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
entities.entity_polygon_withArcType_RHUMB = new Cesium.Entity({
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

entities.entity_box_blue = new Cesium.Entity({
  name: 'box',
  description: 'Blue box',
  position: Cesium.Cartesian3.fromDegrees(-114.0, 37.0, 300000.0),
  box: {
    dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
    material: Cesium.Color.BLUE,
  },
});

entities.entity_box_red = new Cesium.Entity({
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

entities.entity_box_outlineOnly = new Cesium.Entity({
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

entities.entity_circle_green = new Cesium.Entity({
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

entities.entity_ellipse_red = new Cesium.Entity({
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

entities.entity_ellipse_red.ellipse.material = imgRickMorty; // a ImageMaterialProperty is created for us automatically on assignment.

// For more complex materials, we need to create a MaterialProperty instance ourselves.
entities.entity_ellipse_checkerboard = new Cesium.Entity({
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

entities.entity_ellipse_stripe = new Cesium.Entity({
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

entities.entity_ellipse_grid = new Cesium.Entity({
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
entities.entity_ellipse_outlineOnly = new Cesium.Entity({
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

entities.entity_ellipse_blue_extruded = new Cesium.Entity({
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

entities.entity_corridor_red = new Cesium.Entity({
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

entities.entity_corridor_green = new Cesium.Entity({
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

entities.entity_corridor_blue = new Cesium.Entity({
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

entities.entity_cylinder_green = new Cesium.Entity({
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

entities.entity_cone_red = new Cesium.Entity({
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

entities.entity_polyline_withArcType_NONE = new Cesium.Entity({
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

entities.entity_polyline_withArcType_GEODESIC = new Cesium.Entity({
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

entities.entity_polyline_withArcType_RHUMB = new Cesium.Entity({
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

entities.entity_polyline_orange_outlined = new Cesium.Entity({
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

entities.entity_polyline_purple_arrow = new Cesium.Entity({
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

entities.entity_polyline_dashed = new Cesium.Entity({
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

entities.entity_polyline_glow = new Cesium.Entity({
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

entities.entity_polylineVolume_tube = new Cesium.Entity({
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

entities.entity_polylineVolume_box = new Cesium.Entity({
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

entities.entity_polylineVolume_star = new Cesium.Entity({
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

entities.entity_rectangle_red = new Cesium.Entity({
  name: 'rectangle',
  description: 'Red translucent rectangle',
  rectangle: {
    coordinates: Cesium.Rectangle.fromDegrees(22.85, 40.84, 57.12, 47.98),
    material: Cesium.Color.RED.withAlpha(0.5),
  },
});

entities.entity_rectangle_translucent_green = new Cesium.Entity({
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

entities.entity_rectangle_rotating_withTexture = new Cesium.Entity({
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

entities.entity_ellipsoid_blue = new Cesium.Entity({
  name: 'ellipsoid',
  description: 'Blue ellipsoid',
  position: Cesium.Cartesian3.fromDegrees(-5, 22.18, 300000.0),
  // orientation: // TODO how to set this? didn't find the doc about it.
  ellipsoid: {
    radii: new Cesium.Cartesian3(200000.0, 200000.0, 300000.0),
    material: Cesium.Color.BLUE,
  },
});

entities.entity_sphere_red = new Cesium.Entity({
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

entities.entity_ellipsoid_outlineOnly = new Cesium.Entity({
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

entities.entity_wall_red_height = new Cesium.Entity({
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

entities.entity_wall_green_surface = new Cesium.Entity({
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

entities.entity_wall_blue_sawtooth = new Cesium.Entity({
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

entities.entity_point_CitizensBankPark = new Cesium.Entity({
  name: 'Citizens Bank Park',
  position: Cesium.Cartesian3.fromDegrees(-75.166493, 39.9060534),
  billboard: {
    image: imgPhiladelphiaPhillies,
    width: 64,
    height: 64,
  },
  label: {
    text: 'Citizens Bank Park',
    font: '14pt monospace',
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    outlineWidth: 2,
    verticalOrigin: Cesium.VerticalOrigin.TOP,
    pixelOffset: new Cesium.Cartesian2(0, 32),
  },
});

entities.entity_point_LincolnFinancialField = new Cesium.Entity({
  name: 'Lincoln Financial Field',
  position: Cesium.Cartesian3.fromDegrees(-75.16745113181783, 39.900830517357456),
  point: {
    pixelSize: 5,
    color: Cesium.Color.RED,
    outlineColor: Cesium.Color.WHITE,
    outlineWidth: 2,
  },
  label: {
    text: 'Lincoln Financial Field',
    font: '14pt monospace',
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    outlineWidth: 2,
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    pixelOffset: new Cesium.Cartesian2(0, -9),
  },
});

// Sandcastle examples for more customization options about Labels.
// https://sandcastle.cesium.com/?src=Labels.html

entities.entity_point_city_chengdu = new Cesium.Entity({
  name: 'Chengdu',
  description: 'Generally add label',
  position: Cesium.Cartesian3.fromDegrees(104.06586345135878, 30.657467250168803, 50),
  label: {
    text: '成都',
    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
  },
});

entities.entity_point_city_chongqing = new Cesium.Entity({
  name: 'Chongqing',
  description: 'Set font',
  position: Cesium.Cartesian3.fromDegrees(106.55109032171617, 29.56562676699478, 50),
  label: {
    text: '重庆',
    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    font: '24px Helvetica',
    fillColor: Cesium.Color.SKYBLUE,
    outlineColor: Cesium.Color.BLACK,
    outlineWidth: 2,
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
  },
});

const imgFacility = new Image();
imgFacility.src = img_url_Facility;

const addEntityCityChangsha = () => {
  entities.entity_point_city_changsha = new Cesium.Entity({
    name: 'Changsha',
    description: 'Label on top of scaling billboard',
    position: Cesium.Cartesian3.fromDegrees(112.93726634827917, 28.223085412076085),
    billboard: {
      heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
      scaleByDistance: new Cesium.NearFarScalar(1.5e2, 5.0, 1.5e7, 0.5),
      image: imgFacility,
    },
    label: {
      text: '长沙',
      heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
      font: '20px sans-serif',
      showBackground: true,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      pixelOffset: new Cesium.Cartesian2(0.0, -imgFacility.height - 5),
      pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5),
    },
  });
};

if (imgFacility.complete) {
  addEntityCityChangsha();
} else {
  imgFacility.onload = () => {
    addEntityCityChangsha();
  };
}

entities.entity_point_Australia = new Cesium.Entity({
  name: 'Australia',
  description: 'Set properties',
  position: Cesium.Cartesian3.fromDegrees(134.84264674329597, -26.18436898092648, 200000),
  label: {
    text: 'Australia',
    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    scale: 2.0,
    showBackground: true,
  },
});

entities.entity_point_city_shanghai = new Cesium.Entity({
  name: 'Shanghai',
  description: 'Fade label by distance',
  position: Cesium.Cartesian3.fromDegrees(121.47216705606934, 31.231209167627867, 50),
  label: {
    text: '上海',
    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e8, 0.0),
  },
});

entities.entity_point_city_kunming = new Cesium.Entity({
  name: 'Kunming',
  description: 'Fade label by distance',
  position: Cesium.Cartesian3.fromDegrees(102.8341030329759, 24.87759027221219, 50),
  label: {
    text: '昆明',
    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    translucencyByDistance: new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0),
  },
});

entities.entity_point_city_guiyang = new Cesium.Entity({
  name: 'Guiyang',
  description: 'Scale label by distance',
  position: Cesium.Cartesian3.fromDegrees(106.63022327408177, 26.647120329926956, 50),
  label: {
    text: '贵阳',
    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
  },
});

Cesium.Label.enableRightToLeftDetection = true; // Only needs to be set once at the beginning of the application.
entities.entity_point_city_KualaLumpur = new Cesium.Entity({
  name: 'Kuala Lumpur',
  description: 'Set label with right-to-left language',
  position: Cesium.Cartesian3.fromDegrees(101.67872613771206, 3.107212185600827, 50),
  label: {
    text: 'Master (אדון): Hello\nתלמיד (student): שלום',
    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
  },
});

entities.entity_point_city_guangzhou = new Cesium.Entity({
  name: 'Guangzhou',
  description: 'Animate Label',
  position: Cesium.Cartesian3.fromDegrees(113.2650929557566, 23.12538792788729, 50),
  label: {
    text: '广州',
    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    outlineColor: Cesium.Color.BLACK,
    outlineWidth: 0,
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
  },
});

let labelListenerCallback;

// Sandcastle examples for more customization options about Billboards.
// https://sandcastle.cesium.com/?src=Billboards.html

entities.entity_billboard_CesiumLOGO_1 = new Cesium.Entity({
  name: 'Billboard Cesium LOGO 1',
  description: 'Add billboard',
  position: Cesium.Cartesian3.fromDegrees(114.60226666345923, 3.767494188451156, 50),
  billboard: {
    image: imgCesiumLogoOverlay,
    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
  },
});

entities.entity_billboard_CesiumLOGO_2 = new Cesium.Entity({
  name: 'Billboard Cesium LOGO 2',
  description: 'Set rotation',
  position: Cesium.Cartesian3.fromDegrees(114.9919610412115, -2.582625658619737),
  billboard: {
    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    image: imgCesiumLogoOverlay, // default: undefined
    show: true, // default
    pixelOffset: new Cesium.Cartesian2(0, -50), // default: (0, 0)
    eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
    horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // default
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // default: CENTER
    scale: 2.0, // default: 1.0
    color: Cesium.Color.LIME, // default: WHITE
    rotation: Cesium.Math.PI_OVER_FOUR, // default: 0.0
    alignedAxis: Cesium.Cartesian3.ZERO, // default
    width: 100, // default: undefined
    height: 25, // default: undefined
  },
});

entities.entity_billboard_CesiumLOGO_3 = new Cesium.Entity({
  name: 'Billboard Cesium LOGO 3',
  // description: '...',
  position: Cesium.Cartesian3.fromDegrees(79.86553252095942, -30.713994769782122, 300000.0),
  billboard: {
    image: imgCesiumLogoOverlay,
    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    scale: 3.0,
    color: Cesium.Color.WHITE.withAlpha(0.25),
  },
});

entities.entity_billboard_CesiumLOGO_4 = new Cesium.Entity({
  name: 'Billboard Cesium LOGO 4',
  description: 'Size billboard in meters',
  position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
  billboard: {
    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    image: imgCesiumLogoOverlay,
    sizeInMeters: true,
  },
});

const imgFacilityOffset = new Image();
imgFacilityOffset.src = img_url_Facility;

const addEntityBillboardsOffsetByDistance = () => {
  /* Promise.all([
    Cesium.Resource.fetchImage('./assets/images/Cesium_Logo_overlay.png'),
    Cesium.Resource.fetchImage('./assets/images/facility.gif'),
  ]).then((images) => { */
  // As viewer zooms closer to facility billboard,
  // increase pixelOffset on CesiumLogo billboard to this height
  // const facilityHeight = images[1].height;

  // colocated billboards, separate as viewer gets closer
  entities.entity_billboard_CesiumLOGO_5_1 = new Cesium.Entity({
    name: 'Billboard Cesium LOGO 5-1',
    description: 'Offset by viewer distance',
    position: Cesium.Cartesian3.fromDegrees(103.88295179130066, 1.3560485925547168),
    billboard: {
      heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
      image: imgFacilityOffset,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    },
  });
  entities.entity_billboard_CesiumLOGO_5_2 = new Cesium.Entity({
    name: 'Billboard Cesium LOGO 5-2',
    description: 'Offset by viewer distance',
    position: Cesium.Cartesian3.fromDegrees(103.88295179130066, 1.3560485925547168),
    billboard: {
      heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
      image: imgCesiumLogoOverlay,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0.0, -imgFacilityOffset.height - 5),
      pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.0e3, 1.0, 1.5e6, 0.0),
      translucencyByDistance: new Cesium.NearFarScalar(1.0e3, 1.0, 1.5e6, 0.1),
    },
  });
  // });
};

if (imgFacilityOffset.complete) {
  addEntityBillboardsOffsetByDistance();
} else {
  imgFacilityOffset.onload = () => {
    addEntityBillboardsOffsetByDistance();
  };
}

entities.entity_billboard_CesiumLOGO_6_1 = new Cesium.Entity({
  name: 'Billboard Cesium LOGO 6-1',
  description: 'marker',
  position: Cesium.Cartesian3.fromDegrees(161.92009969242505, 13.183259309991355),
  billboard: {
    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    image: imgWhiteShapes,
    imageSubRegion: new Cesium.BoundingRectangle(49, 43, 18, 18),
    color: Cesium.Color.LIME,
  },
});

entities.entity_billboard_CesiumLOGO_6_2 = new Cesium.Entity({
  name: 'Billboard Cesium LOGO 6-2',
  description: 'marker',
  position: Cesium.Cartesian3.fromDegrees(-176.0556417058752, 11.450392633509344),
  billboard: {
    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    image: imgWhiteShapes,
    imageSubRegion: new Cesium.BoundingRectangle(61, 23, 18, 18),
    color: new Cesium.Color(0, 0.5, 1.0, 1.0),
  },
});

entities.entity_billboard_CesiumLOGO_6_3 = new Cesium.Entity({
  name: 'Billboard Cesium LOGO 6-3',
  description: 'marker',
  position: Cesium.Cartesian3.fromDegrees(177.44055038489802, 7.074919300596605),
  billboard: {
    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    image: imgWhiteShapes,
    imageSubRegion: new Cesium.BoundingRectangle(27, 103, 22, 22),
    color: new Cesium.Color(0.5, 0.9, 1.0, 1.0),
  },
});

entities.entity_billboard_CesiumLOGO_7 = new Cesium.Entity({ // FIXME On the other side of the sphere, the entity can still be seen.
  name: 'Billboard Cesium LOGO 7',
  description: 'Disable the depth test when clamped to ground.',
  position: Cesium.Cartesian3.fromDegrees(-122.1958, 46.1915),
  billboard: {
    image: img_url_Facility,
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
  },
});

export const demoShowEntities = (viewer) => {
  viewer.entities.collectionChanged.addEventListener(onChanged);

  viewer.entities.suspendEvents();

  viewer.scene.globe.depthTestAgainstTerrain = true;

  addEntities(viewer, entities);

  labelListenerCallback = animateLabel(viewer, entities.entity_point_city_guangzhou);

  viewer.entities.resumeEvents();

  viewer.flyTo(entities.entity_polygon_wyoming).then((result) => {
    if (result) {
      viewer.selectedEntity = entities.entity_polygon_wyoming;
    } else {
      ConsoleLog('The flight was canceled');
    }
  }, (error) => {
    ConsoleLog(error);
  });
};

export const destroyDemoShowEntities = (viewer) => {
  viewer.entities.removeAll();

  viewer.scene.globe.depthTestAgainstTerrain = false;

  /* for (const entity in entities) {
    if (Object.prototype.hasOwnProperty.call(entities, entity)) {
      entities[entity] = undefined;
    }
  } */

  if (Cesium.defined(labelListenerCallback)) {
    labelListenerCallback();
  }

  viewer.entities.collectionChanged.removeEventListener(onChanged);
};
