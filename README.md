# vue-masonry-wall
A pure vue masonry project without direct dom manipulation and ssr friendly. 
I created this because [vue-masonry](https://github.com/shershen08/vue-masonry) has no SSR support and I needed a pure vue implementation. 

[Live Demo](https://nuxt-app.fuxing.dev/vue-masonry-wall)

## Features 
- No Direct DOM Manipulation
- SSR Support

## Usage
```vue
<masonry :items="items" :options="options" @append="append"/>
```

```js
const items = []
const options = {
  width: 300,
  padding: {
    default: 12,
    1: 6,
    2: 8
  }
}

const append = () => {
  // API call and add items
  this.items.push(...[])
}
```

### Basic
```vue
<template>
    <div id="app">
        <h2>Masonry: append endlessly</h2>

        <masonry :items="items" :options="{width: 300, padding: 12}" @append="append">
            <template v-slot:default="{item}">
                <div class="item">
                    <h5>{{item.title}}</h5>
                    <p class="text-ellipsis">{{item.content}}</p>
                </div>
            </template>
        </masonry>
    </div>
</template>

<script>
  import Masonry from "vue-masonry-wall";

  export default {
    name: 'app',
    components: {Masonry},
    data() {
      return {
        items: [
          {title: 'Item 0', content: 'Content'},
          {title: 'Item 1', content: 'Content'},
        ]
      }
    },
    methods: {
      /**
       * I am mocking a API call that load 20 objects at a time.
       */
      append() {
        for (let i = 0; i < 20; i++) {
          this.items.push({title: `Item ${this.items.length}`, content: 'Content'})
        }
      }
    }
  }
</script>
```
### Nuxt SSR
Add `:ssr="{columns: 2}"` to masonry so that during SSR, it will be load in 2 columns.

SSR has no clue what is the size of your height of your element or width of the browser.
You can however guess based on user-agent: https://github.com/nuxt-community/device-module
This param allow you to preload a config for SSR rendering, it will distribute your items into all columns.

```vue
<template>
    <div id="app">
        <h2>Masonry: append endlessly</h2>

        <masonry :items="items" :options="{width: 300, padding: 12}" :ssr="{columns: 2}" @append="append">
            <template v-slot:default="{item}">
                <div class="item">
                    <h5>{{item.title}}</h5>
                    <p class="text-ellipsis">{{item.content}}</p>
                </div>
            </template>
        </masonry>
    </div>
</template>
```

## Installation
NPM
```
npm i vue-masonry-wall
```

Yarn
```
yarn add vue-masonry-wall
```

## Dependencies
- [vue-observe-visibility](https://github.com/Akryum/vue-observe-visibility) = [IntersectionObserver](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)
- [lodash](https://github.com/lodash/lodash)  

## Features from my original project removed for brevity of the package
- [nuxt-community/device-module](https://github.com/nuxt-community/device-module) to detect browser for better SSR support.
- [vue-scrollto](https://www.npmjs.com/package/vue-scrollto) to scroll to a item in masonry.

## Building & Publishing
```
yarn run build:npm
yarn publish
```

## License
MIT
