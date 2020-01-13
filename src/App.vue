<template>
  <div id="app">
    <h2>Masonry: append endlessly</h2>

    <Masonry :items="items" :options="options" @append="append">
      <template v-slot:default="{item}">
        <div class="item">
          <h5>{{item.title}}</h5>
          <p>{{item.content}}</p>
        </div>
      </template>
    </Masonry>
  </div>
</template>

<script>
  import Masonry from "./Masonry";

  function content() {
    const length = Math.random() * 300 + 30

    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  export default {
    name: 'app',
    components: {Masonry},
    data() {
      return {
        options: {
          width: 300,
          padding: 12
        },
        items: [
          {title: 'Item 0', content: content()},
          {title: 'Item 1', content: content()},
          {title: 'Item 2', content: content()},
          {title: 'Item 3', content: content()},
        ]
      }
    },
    methods: {
      /**
       * I am mocking a API call that load 20 objects at a time.
       */
      append() {
        for (let i = 0; i < 20; i++) {
          this.items.push({title: `Item ${this.items.length}`, content: content()})
        }
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Roboto', sans-serif;

    max-width: 1400px;

    margin-left: auto;
    margin-right: auto;

    padding: 80px 24px;
  }

  @media (min-width: 1200px) {
    #app {
      padding-left: 80px;
      padding-right: 80px;
    }
  }

  h2 {
    font-size: 30px;
    margin: 0 0 24px;
  }

  h5 {
    font-size: 18px;
    line-height: 1.5;
    margin: 0 0 8px;
  }

  p {
    font-size: 17px;
    line-height: 1.5;
    font-weight: 400;
    margin: 0;

    word-break: break-word;
  }

  .item {
    padding: 16px 24px;
    border-radius: 3px;
    background: #F5F5F5;
  }
</style>
