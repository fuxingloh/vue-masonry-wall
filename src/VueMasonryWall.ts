import Vue, {CreateElement, VNode} from 'vue'

// TODO(fuxing): export responsive col calculator

// Compatibility delta due to rounding issues
// const delta = 2.5

// type VNodeCache = { [key: string]: VNode | null };

// type VueMasonryWall = CombinedVueInstance & {cache: VNodeCache}

export default Vue.extend({
  name: 'VueMasonryWall',
  props: {
    col: {
      type: Number,
      required: true,
    },
    heightResolver: {
      type: Function,
      required: false,
      default: () => {

      }
    },
  },
  data() {
    return {
      matrix: {
        columns: [

        ],
      }
    }
  },
  created() {
    this.cache = {}
  },
  destroyed() {
    // TODO(fuxing): destroy all
  },
  render(h: CreateElement): VNode {
    if (this.matrix.columns.length !== this.col) {
      // TODO(fuxing): recalculate
    }

    // TODO(fuxing): if the VNode is update, it should only render what is within view for performance

    // TODO(fuxing): columns to be cached

    const columns = [
      h('h1', 'Hello')
    ]

    // this.$slots.default
    return h('div', {staticClass: 'vue-masonry-wall', staticStyle: {}}, [
      h('div', {staticStyle: {}}, columns),
      h('div', {staticClass: 'vmw-loader'})
    ])
  }
});
