<script>
export default {
  name: 'VueMasonryWall', // vue component name
  data() {
    return {
      counter: 5,
      initCounter: 5,
    };
  },
  methods: {
    increment(arg) {
      if (typeof arg !== 'number') this.counter += 1;
      else this.counter += arg;
    },
    decrement(arg) {
      if (typeof arg !== 'number') this.counter -= 1;
      else this.counter -= arg;
    },
    reset() {
      this.counter = this.initCounter;
    }
  },
}
</script>

<template>
  <div class="vue-masonry-wall">
    <p>The counter is set to <b>{{ counter }}</b>.</p>
    <button @click="increment">
      Click +1
    </button>
    <button @click="decrement">
      Click -1
    </button>
    <button @click="increment(5)">
      Click +5
    </button>
    <button @click="decrement(5)">
      Click -5
    </button>
    <button @click="reset">
      Reset
    </button>
  </div>
</template>

<style scoped>
  .vue-masonry-wall {
    display: block;
    width: 400px;
    margin: 25px auto;
    border: 1px solid #ccc;
    background: #eaeaea;
    text-align: center;
    padding: 25px;
  }
  .vue-masonry-wall p {
    margin: 0 0 1em;
  }
</style>
