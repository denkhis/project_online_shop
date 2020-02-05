import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({
  state: { //создаем массивы
    products: [],
    cart: []
  },
  mutations: { // записываем полученные данные в массив products
    SET_PRODUCTS_TO_STATE: (state, products) => {
      state.products = products;
    },
    SET_CART: (state, product) => {
      if(state.cart.length) { // есть ли что нибудь в корзине
        let isCartItemExist = false;
        state.cart.map(function(item) { // пробегаем через все items в корзине
          if(item.article === product.article) { // если с таким артиклом уже есть...
            isCartItemExist = true;
            item.quantity++; // item - то, что уже лежит в корзине
          }
        })
        if(!isCartItemExist) { 
          state.cart.push(product)
        }
      } else {
        state.cart.push(product)
      }
    },
    REMOVE_FROM_CART: (state, index) => {
      state.cart.splice(index, 1)
    }
  },
  actions: {
    //получаем данные с сервера с помощью axios
    GET_PRODUCTS_FROM_API({commit}) {
      return axios('http://localhost:3000/products', { //ccылка берется из --watch db.json
        method: "GET"
      }).then((products) => {
        commit('SET_PRODUCTS_TO_STATE', products.data); //в коммит передаем мутацию и products
        return products; //чтобы обращаться к products из компонентов
      }).catch((error) => {
        console.log(error)
        return error; //чтобы обращаться из компонентов
      })
    },
    ADD_TO_CART({commit}, product) {
      commit('SET_CART', product)
    },
    DELETE_FROM_CART({commit}, index) {
      commit('REMOVE_FROM_CART', index)
    }
  },
  getters: { // передает данные в компонент 
    PRODUCTS(state) {
      return state.products
    },
    CART(state) {
      return state.cart
    }
  }
});

export default store;