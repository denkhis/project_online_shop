<template>
  <div class="v-catalog">
    <router-link :to="{name: 'cart', params: {cart_data:CART}}">
      <div class="v-catalog__link_to_cart">Cart: {{CART.length}}</div>
    </router-link>
    <h1>Catalog</h1>
    <v-select
      :options="options"
      @selectOption="sortByCategories"
      :selected="selected"
    >
    </v-select>
    <div class="v-catalog__list">
      <v-catalog-item 
      v-for="product in filteredProducts"
      v-bind:key="product.article"
      v-bind:product_data="product" 
      @addToCart="addToCart" 
      >
    </v-catalog-item>
    </div>
  </div>
</template>

<script>
import vCatalogItem from './v-catalog-item.vue'
import vSelect from '../v-select.vue'
import {mapActions, mapGetters} from 'vuex' 


export default {
  name: 'v-catalog',
  props: {},
  data() {
    return {
      options: [
        {name: 'Все', value: 'ALL'},
        {name: 'Мужские', value: 'м'},
        {name: 'Женские', value: 'ж'}
      ],
      selected: 'Все',
      sortedProducts: []
    }
  },
  components: {
    vCatalogItem,
    vSelect
  },
  computed: { // чтобы не обращаться вот так this.$store.state.products
    ...mapGetters([
      'PRODUCTS',
      'CART' //чтобы использовать CART.length в __link_to_cart
    ]),
    filteredProducts() { 
      //из filteredProducts будет состоять наш каталог
      if(this.sortedProducts.length) {
        //если что-то есть в //если что-то есть в sortedProducts
        return this.sortedProducts;
      } else {
        //если в sortedProducts пусто 
        return this.PRODUCTS;
      }
    }
  },
  methods: { 
    ...mapActions([ // чтобы к методу можно было обратиться через this 
      'GET_PRODUCTS_FROM_API',
      'ADD_TO_CART'
    ]),
    addToCart(data) { //приходит от ребенка с помощью $emit (по нажатию на кнопку добавить в корзину)
      this.ADD_TO_CART(data)
    },
    sortByCategories(option) {
      //очищаем массив
      this.sortedProducts = []; 
      let vm = this;
      //пробегается по продуктам
      this.PRODUCTS.map(function(item) {
        if(item.category === option.name) {
          //пушим в sortedProducts найденные элементы
          vm.sortedProducts.push(item);
        }
      })
      this.selected = option.name;
    }
  },
  mounted() { // хук жизненного цикла (код, который запустится после отображения всех представлений)
    this.GET_PRODUCTS_FROM_API() // выполняется GET_PRODUCTS_FROM_API (когда отрендерился html)
    .then((response) => { // промис 
      if(response.data) {
        console.log('Data arrived!')
      }
    })
  }
}
</script>

<style lang="scss">
  .v-catalog {
    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
    }
    &__link_to_cart {
      position: fixed;
      top: 10px;
      right: 10px;
      padding: $padding*2;
      border: solid 1px #aeaeae;
      background: #ffffff;
    }
  }
  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .range-slider {
    width: 200px;
    margin: auto 16px;
    text-align: center;
    position: relative;
  }
  .range-slider svg, .range-slider input[type=range] {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  input[type=range]::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    top: 2px;
    margin-top: -7px;
  }
</style>