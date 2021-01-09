<template>
  <div class="should-be-empty">
    <vue-masonry-wall>
    </vue-masonry-wall>
    <div>
      Above is empty. For E2E testing.
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueMasonryWall from '@/vue-masonry-wall.vue';

export default Vue.extend({
  components: {
    VueMasonryWall
  },
});
</script>
