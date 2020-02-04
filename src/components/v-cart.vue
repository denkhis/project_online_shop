<template>
  <div class="v-cart">
    <router-link :to="{name: 'catalog'}">
      <div class="v-catalog__link_to_cart">Back</div>
    </router-link>
    <h1>Cart</h1>
    <p v-if="!cart_data.length">There is no products in cart...</p>
    <v-cart-item
      v-for="(item, index) in cart_data"
      v-bind:key="item.article"
      v-bind:cart_item_data="item"
      @deleteFromCart="deleteFromCart(index)" 
    >
    </v-cart-item>
  </div>
</template>

<script>
import vCartItem from './v-cart-item'
import {mapActions} from 'vuex'

export default {
  name: 'v-cart',
  components: {
    vCartItem
  },
  props: {
    cart_data: { 
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {

    }
  },
  computed: {},
  methods: {
    ...mapActions([
      "DELETE_FROM_CART"
    ]),
    deleteFromCart(index) { // каждому элементу item передаем и его индекс, чтобы по индексу удалять из корзины
      this.DELETE_FROM_CART(index)
    }
  }

}
</script>

<style>

</style>