import Vue from 'vue'
import Vuex from 'vuex'

import commonActions from "./actions/actions.js"
import apiRequests from "./actions/api-requests.js"
import mutations from "./mutations/mutations.js"
import getters from "./getters/getters.js"

//объединяем commonActions и apiRequests
const actions = {...commonActions, ...apiRequests} 

Vue.use(Vuex);

let store = new Vuex.Store({
  state: { //создаем массивы
    products: [],
    cart: []
  },
  mutations,
  actions,
  getters
});

export default store;