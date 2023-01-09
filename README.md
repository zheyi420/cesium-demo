# cesium-demo

- Module Bundler: [Vite 3](https://vitejs.dev/)
- JavaScript Framework for Web User Interfaces: [Vue 3](https://vuejs.org/)
- Store Library for Vue: [Pinia 2](https://pinia.vuejs.org/)
- Router: [Vue Router 4](https://router.vuejs.org/)
- JavaScript library for creating world-class 3D globes and maps: [CesiumJS](https://cesium.com/learn/cesiumjs-learn/)

## Function Demonstration

- [x] [Flight Tracker](https://cesium.com/learn/cesiumjs-learn/cesiumjs-flight-tracker/).

- [ ] Satellite Tracker.

- Demo from [CesiumJS Code Examples](https://sandcastle.cesium.com/).

  - [x] [3D Tiles BIM](https://sandcastle.cesium.com/?src=3D%20Tiles%20BIM.html): A sample BIM dataset rendered with 3D Tiles.

  - [ ] [3D Tiles Clipping Planes](https://sandcastle.cesium.com/?src=3D%20Tiles%20Clipping%20Planes.html): User-defined clipping planes applied to a batched 3D Tileset, point cloud, and model.

  - [ ] [3D Tiles Compare](https://sandcastle.cesium.com/?src=3D%20Tiles%20Compare.html): Compare 3D Tiles tilesets by showing different ones on different sides of the screen.

  - [ ] [3D Tiles Feature Picking](https://sandcastle.cesium.com/?src=3D%20Tiles%20Feature%20Picking.html): Pick features in a 3D Tiles tileset.

- Basic Functions.

  - [ ] Display spatial coordinates.

  - [ ] Distance measurement.

  - [ ] Area measurement.

## File Structure

- /public (Directory to serve as plain static assets.) [vitejs#publicDir](https://vitejs.dev/config/shared-options.html#publicdir)
  - /cesium/Build/Cesium (The URL on your server where CesiumJS's static files are hosted.)
- /src
  - App.vue (root component)
  - /components (for Vue components)
  - /utils
    - /cesium (cesium related utils code)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## About 'VITE_BUILD_PATH_PREFIX'

The files `.env.development` and `.env.production` are configs for development and production environment.

Since it is deployed on GitHub Pages `https://<USERNAME>.github.io/<REPO>/`, you need to set `VITE_BUILD_PATH_PREFIX='<REPO>'` to refer to the static files in `/public`.

In general or dev env, just set `VITE_BUILD_PATH_PREFIX=''`, it should be no problem.

## Project References

- [vue-vite-cesium-demo](https://github.com/lihanqiang/vue-vite-cesium-demo)