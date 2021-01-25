<template>
  <div id="app">
    <router-link to="/">
      <h1>Vue Masonry Wall</h1>
    </router-link>

    <router-view></router-view>
  </div>
</template>

<style>
body {
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0 0 8px;
}

p {
  margin: 0;
  font-size: 17px;
  line-height: 1.5;
  font-weight: 500;
  color: #333;
  word-break: break-word;
}

a {
  text-decoration: none;
  color: initial;
}

a:hover,
a:hover > * {
  color: #0000db;
}
</style>

<style scoped>
#app {
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding: 64px;
}

@media (max-width: 420px) {
  #app {
    padding: 24px;
  }
}

@media (min-width: 1200px) {
  #app {
    padding-left: 80px;
    padding-right: 80px;
  }
}

#app > div {
  margin: 48px 0;
}

.vue-masonry-wall {
  margin-bottom: 24px;
}
</style>
