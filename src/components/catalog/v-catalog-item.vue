<template>
  <div class="v-catalog-item">
    <img class="v-catalog-item__image" v-bind:src=" require('../../assets/images/' + product_data.image) " alt="img">
    <p class="v-catalog-item_name">{{product_data.name}}</p>
    <p class="v-catalog-item_price">Price: {{product_data.price}} Р</p>
    <button 
    class="v-catalog-item_btn btn"
    @click="addToCart"
    >
      Add to cart
    </button>
  </div>
</template>

<script>
export default {
  name: 'v-catalog-item',
  props: { //передается ребенку от родительского компонента
    product_data: { //название просто из головы
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    addToCart() { // передаем наверх родителю 
      this.$emit('addToCart', this.product_data)
    }
  },
  mounted() {
    //добавляем в объект product_data ключ quantity
    this.$set(this.product_data, 'quantity', 1) 
  }
}
</script>

<style lang="scss">
  .v-catalog-item {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;
    &__image {
      width: 200px;
      height: 200px;
    }
  }
</style>