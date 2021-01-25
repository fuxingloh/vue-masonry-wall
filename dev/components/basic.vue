<template>
  <div class="vue-masonry-wall">
    <div class="vmw-col" v-for="item in items" :key="item.i">
      <section>
        <div class="header">
          <h6>{{ item.i }}</h6>
          <h3>{{ item.title }}</h3>
        </div>
        <p>{{ item.content }}</p>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {loremItems} from './utils'

export default Vue.extend({
  data() {
    return {
      items: loremItems("content-width", 100, {
        title: (lorem) => lorem.generateWords(2),
        content: (lorem) => lorem.generateSentences(2),
      }),
    }
  }
});
</script>

<style scoped>
.vue-masonry-wall {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.vmw-col {
  flex: 1;
  margin: 4px;
}
</style>

<!-- Content Design -->
<style scoped>
section {
  padding: 16px 24px;
  border-radius: 4px;
  background: #f5f5f5;
}

.header {
  display: flex;
}

.header h6 {
  flex-shrink: 0;
  background: #0000db;
  font-size: 14px;
  color: white;
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  border-radius: 12px;
  margin-right: 12px;
}
</style>
