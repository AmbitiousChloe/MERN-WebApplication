export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
    //item price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => 
    acc + item.price * item.qty, 0));

    //shipping price
    state.shippingPrice = addDecimals(state.itemsPrice > 100? 0: 10);

    //tax price
    state.tax = addDecimals(Number((state.itemsPrice * 0.15).toFixed(2)));

    //total price
    state.totalPrice = addDecimals(Number(state.itemsPrice) 
    + Number(state.shippingPrice) + Number(state.tax))

    localStorage.setItem('cart', JSON.stringify(state));
    
    return state;
};
