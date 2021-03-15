<template>
  <div class="masonry-wall" ref="wall" :style="_style.wall" :class="{ready}">
    <div class="masonry-column" v-for="(lane, index) in columns" :key="index" :style="_style.lane">

      <div class="masonry-item" v-for="i in lane.indexes" :key="i" :style="_style.item" :ref="`item_${i}`">
        <slot v-bind:item="items[i]" :index="i">{{items[i]}}</slot>
      </div>

      <div class="masonry-bottom" ref="bottom" :data-column="index"
           v-observe-visibility="{callback: (v) => v && _fill(),throttle:_options.throttle}"
      />
    </div>
  </div>
</template>

<script>
  import {maxBy} from 'lodash'
  import {ObserveVisibility} from "vue-observe-visibility";

  /**
   * @param count number of columns to create
   * @returns {[{i: number, indexes: []},...]}
   */
  const _newColumns = (count) => {
    const columns = []
    for (let i = 0; i < count; i++) {
      columns.push({i: i, indexes: []})
    }
    return columns
  }

  export default {
    name: "VueMasonryWall",
    directives: {
      'observe-visibility': ObserveVisibility
    },
    props: {

      /**
       * Array of items to add into masonry
       */
      items: {
        type: Array,
        required: true
      },

      /**
       * Options to config masonry.
       *
       * {
       *     width: 300,
       *     padding: {
       *         default: 12,
       *         1: 6,
       *         2: 8,
       *     },
       *     throttle: 300
       * }
       */
      options: {
        type: Object,
        required: false
      },

      /**
       * SSR has no clue what is the size of your height of your element or width of the browser.
       * You can however guess based on user-agent: https://github.com/nuxt-community/device-module
       * This param allow you to preload a config for SSR rendering, it will distribute your items into all columns evenly.
       *
       * Once the client is mounted, it will redraw if the config is different from SSR.
       *
       * {
       *     column: 2
       * }
       */
      ssr: {
        type: Object,
        required: false
      }
    },
    data() {
      const count = this.ssr && this.ssr.columns
      if (count > 0) {
        const columns = _newColumns(count)

        for (let i = 0; i < this.items.length; i++) {
          columns[i % count].indexes.push(i)
        }

        return {
          columns: columns,
          cursor: this.items.length,
          ready: false
        }
      }

      return {
        columns: [],
        cursor: 0,
        ready: false
      }
    },
    /**
     * For detecting browser resize event to redraw the columns.
     */
    mounted() {
      this.$resize = () => {
        if (this.columns.length !== this._columnSize()) {
          this.redraw()
        }
      }

      this.$resize()
    
      // set opacity to 1 when ssr.columns is recieved and  this.columns.length === this._columnSize() so redraw does not get called for the first time.
      if(!this.ready) this.ready = true;
      
      window.addEventListener('resize', this.$resize)
    },
    /**
     * Remove resize event listener
     */
    beforeDestroy() {
      window.removeEventListener('resize', this.$resize)
    },
    computed: {

      /**
       * Options with default override if not given
       *
       * @private
       */
      _options() {
        const options = this.options
        return {
          width: options && options.width || 300,
          padding: {
            default: options && options.padding && options.padding.default || 12
          },
          throttle: options && options.throttle || 300
        }
      },

      /**
       * Style of wall, column and item for padding
       * @private
       */
      _style() {
        let padding = this.options && this.options.padding
        if (padding && typeof padding != 'number') {
          padding = this.options.padding[this.columns.length] || this._options.padding.default
        }

        return {
          wall: {
            margin: `-${padding}px`
          },
          lane: {
            paddingLeft: `${padding}px`,
            paddingRight: `${padding}px`,
          },
          item: {
            paddingTop: `${padding}px`,
            paddingBottom: `${padding}px`,
          }
        }
      },
    },
    methods: {
      /**
       * Redraw masonry
       */
      redraw() {
        this.ready = false
        this.columns.splice(0)
        this.cursor = 0
        this.columns.push(..._newColumns(this._columnSize()))
        this.ready = true
        this._fill()
      },

      /**
       *
       * @returns {number}
       * @private internal component use
       */
      _columnSize() {
        const length = Math.round(this.$refs.wall.scrollWidth / this._options.width)
        if (length < 1) return 1
        return length
      },

      /**
       * Add items into masonry columns, items are added to the shortest column first.
       *
       * @private internal component use
       */
      _fill() {
        if (!this.ready) return

        if (this.cursor >= this.items.length) {
          // Request for more items
          this.$emit('append')
          return
        }

        // Keep filling until no more items
        this.$nextTick(() => {
          const bottom = maxBy(this.$refs.bottom, (spacer) => spacer.clientHeight || 0)
          this._addItem(bottom.dataset.column)
          this._fill()
        })
      },

      /**
       * Items will automatically be taken from items with cursor.
       *
       * @param index of the column to add to
       * @private internal component use
       */
      _addItem(index) {
        const column = this.columns[index]
        if (this.items[this.cursor]) {
          column.indexes.push(this.cursor)
          this.cursor++
        }
      },
    }
  }
</script>

<style scoped>
  .masonry-wall {
    display: flex;
  }

  .masonry-wall:not(.ready) {
    opacity: 0;
  }

  .masonry-column {
    flex-grow: 1;
    flex-basis: 0;

    display: flex;
    flex-direction: column;
  }

  .masonry-bottom {
    flex-grow: 1;
    margin-top: -300px;
    padding-top: 300px;
    min-height: 100px;
    z-index: -1;
  }
</style>
