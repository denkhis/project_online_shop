import Vue from 'vue'
import VueRouter from 'vue-router'

import vCatalog from '../components/catalog/v-catalog.vue'
import vCart from '../components/cart/v-cart.vue'

Vue.use(VueRouter);

let router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'catalog',
      component: vCatalog
    },
    {
      path: '/cart',
      name: 'cart',
      component: vCart,
      props: true // если мы хотим при загрузке роута передавать еще данные в него из бд 
    }
  ]
})

export default router;