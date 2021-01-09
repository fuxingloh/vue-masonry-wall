import Vue, {VNode} from 'vue';
import VueRouter from 'vue-router'

import Index from './index.vue'
import Serve from './serve.vue'
import components from './components'

Vue.use(VueRouter)
Vue.config.productionTip = false;

components.forEach(({name, component}) => {
  Vue.component(name, component)
})

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Index},
    ...components.map(({path, component}) => {
      return {path, component}
    })
  ]
})

new Vue({
  router,
  render: (h): VNode => h(Serve),
}).$mount('#app');
