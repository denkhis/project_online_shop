import axios from 'axios'

export default {
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
}  
}