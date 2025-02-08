import { getProduct } from "./products.js";
import { centsToDollars } from "./utils/money.js";

export const cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId, productQuantity){
    // If the product is already in cart increase item quantity
    let foundMatch = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].productId === productId) {
            cart[i].quantity += productQuantity;
            foundMatch = true;
        }
    }
    // If the product is not in the cart, add a new item
    if(!foundMatch){
        let item = {
            productId,
            quantity: productQuantity,
            deliveryChoice : 1
        };
        cart.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function deleteFromCart(productId){
    for(let i = 0; i < cart.length; i++){
        if(cart[i].productId === productId){
            cart.splice(i, 1);
            break;
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart))
}

export function getCartLength(){
    let totalItems = 0;
    cart.forEach(product => {
      totalItems += product.quantity;
    })
    return totalItems;
}

export function getCartTotal(){
    let cartTotal = 0;
    cart.forEach(cartItem => {
        const product = getProduct(cartItem);
        let total = product.priceCents * cartItem.quantity;
        cartTotal += centsToDollars(total);
    })
    return Number(cartTotal.toFixed(2));
}

export function clearCart(){
    cart.length = 0;
    localStorage.setItem('cart', JSON.stringify(cart));
}