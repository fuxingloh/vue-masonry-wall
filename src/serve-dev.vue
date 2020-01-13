<script>
import Vue from 'vue';
import VueMasonryWall from '@/vue-masonry-wall.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueMasonryWall
  }
});
</script>

<template>
  <div id="app">
    <vue-masonry-wall />
  </div>
</template>
