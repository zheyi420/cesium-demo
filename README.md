# cesium-demo

- Module Bundler: [Vite 3](https://vitejs.dev/)
- JavaScript Framework for Web User Interfaces: [Vue 3](https://vuejs.org/)
- Store Library for Vue: [Pinia 2](https://pinia.vuejs.org/)
- Router: [Vue Router 4](https://router.vuejs.org/)
- JavaScript library for creating world-class 3D globes and maps: [CesiumJS](https://cesium.com/learn/cesiumjs-learn/)

# Function Demonstration

- Demo from [CesiumJS Code Examples](https://sandcastle.cesium.com/).
  - 3D Tiles Adjust Height.
  - Ambient Occlusion.
  - CZML.
  - and more...
- Flight Tracker.
- Satellite Tracker.
- Basic Functions:
  - Display spatial coordinates.
  - Distance measurement.
  - Area measurement.

# Code Structure Detail

- /public (Directory to serve as plain static assets.) [vitejs#publicDir](https://vitejs.dev/config/shared-options.html#publicdir)
  - /cesium/Build/Cesium (The URL on your server where CesiumJS's static files are hosted.)
- /src
  - App.vue (root component)
  - /components (for Vue components)
  - /utils
    - /cesium (cesium related utils code)

# Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

# Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

# Project Setup

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

# Project References

- [vue-vite-cesium-demo](https://github.com/lihanqiang/vue-vite-cesium-demo)

# Todo

- [ ] use [JSDoc](https://jsdoc.app/).
- [ ] ...
