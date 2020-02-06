<template>
  <div class="v-select">
    <p 
      @click="areOptionsVisible = !areOptionsVisible"
      class="title"
      >
      {{selected}}
    </p>
    <div 
      class="options"
      v-if="areOptionsVisible"
      >
      <p
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
      >
      {{option.name}}
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: "v-select",
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    },
    //чтобы при выборе опции отображалось ее название в title
    //приходит от родителя
    selected: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      areOptionsVisible: false
    }
  },
  methods: {
    selectOption(option) {
      //передаем в родителя
      this.$emit('selectOption', option);
      this.areOptionsVisible = false;
    },
    hideSelect() {
      this.areOptionsVisible = false;
    }
  },
  mounted() {
    document.addEventListener("click", this.hideSelect.bind(this), true);
  },
  beforeDestroy() {
    document.addEventListener("click", this.hideSelect.bind);
  }

}
</script>
<style>
  .v-select p {
    margin: 0;
  }
</style>