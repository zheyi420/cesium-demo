export const GalleryList = [
  {
    label: 'Other',
    contents: [
      /* {
        label: 'QuickStart',
        description: 'A basic Cesium app loading global 3D terrain and buildings in San Francisco.',
      }, */
      {
        label: 'Flight Tracker',
        description: 'Visualize a real flight from San Francisco to Copenhagen, with radar data collected by FlightRadar24.',
        disabled: false,
      },
      {
        label: 'Show Entities',
        description: 'Show Entities',
        disabled: false,
      },
      {
        label: '3D Models',
        description: '3D Models',
        disabled: false,
      },
      {
        label: 'Proposed Building',
        description: 'Visualize a Proposed Building in a 3D City',
        disabled: false,
      },
      {
        label: 'Shipping',
        description: 'Shipping',
        disabled: false,
      },
    ],
  },
  {
    label: '3D Tiles',
    contents: [
      {
        // https://sandcastle.cesium.com/?src=3D%20Tiles%20BIM.html
        label: 'BIM',
        description: 'A sample BIM dataset rendered with 3D Tiles.',
        disabled: false,
      },
      {
        // https://sandcastle.cesium.com/gallery/3D%20Tiles%20Clipping%20Planes.html
        label: 'Clipping Planes',
        description: 'User-defined clipping planes applied to a batched 3D Tileset, point cloud, and model.',
        disabled: false,
      },
      {
        label: 'Compare',
        description: 'Compare 3D Tiles tilesets by showing different ones on different sides of the screen.',
        disabled: true,
      },
      {
        label: 'Feature Picking',
        description: 'Pick features in a 3D Tiles tileset.',
        disabled: true,
      },
      {
        label: 'Inspector',
        description: 'Use the 3D Tiles inspector as a debugging tool for different tilesets.',
        disabled: true,
      },
      {
        label: 'Interior',
        description: 'A sample interior rendered with 3D Tiles.',
        disabled: true,
      },
      {
        label: 'Point Cloud Shading',
        description: 'Point Cloud Attenuation and Eye Dome Lighting example.',
        disabled: true,
      },
      {
        label: 'Terrain Classification',
        description: 'A sample Vector dataset on terrain rendered with 3D Tiles.',
        disabled: true,
      },
    ],
  },
  {
    label: '3D Tiles Next',
    contents: [
      {
        label: 'CDB Yemen',
        description: 'Load a 3D Tile Next tileset converted from CDB.',
        disabled: true,
      },
      {
        label: 'Photogrammetry Classification',
        description: 'Load a photogrammetry dataset with feature ID textures from EXT_mesh_features.',
        disabled: true,
      },
    ],
  },
  {
    label: 'Post Processing',
    contents: [
      {
        label: 'Ambient Occlusion',
        description: 'Ambient Occlusion.',
        disabled: true,
      },
    ],
  },
  {
    label: 'DataSources',
    contents: [
      {
        label: 'CZML',
        description: 'A simple CZML example showing four satellites in orbit around the Earth, and some ground objects.',
        disabled: true,
      },
    ],
  },
];
