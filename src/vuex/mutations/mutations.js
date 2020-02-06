export default {
    // записываем полученные данные в массив products
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
      },
    INCREMENT: (state, index) => {
        state.cart[index].quantity++;
      },
    DECREMENT: (state, index) => {
        if(state.cart[index].quantity > 1) {
            state.cart[index].quantity--;
        }
      }
}