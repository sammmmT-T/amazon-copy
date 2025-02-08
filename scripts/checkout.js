import { renderCheckoutPage } from "./checkout/orderSummary.js";
import { getProduct } from "../data/products.js";
import { cart, clearCart, getCartTotal } from "../data/cart.js";
import { orderHistory } from "../data/orderedCart.js";

renderCheckoutPage();

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".js-place-order-button")
    .addEventListener("click", (event) => {
      //do nothing if place order is clicked with no item in cart
      if(cart.length !== 0){
        generateOrderCart();
      }
    });
});

function generateOrderCart() {
  //clear previous ordered items in the orderedCart
  let orderedCart = [
    {
      items: [],
      total: 0,
    }
  ];

  localStorage.setItem("orderedCart", JSON.stringify(orderedCart));

  cart.forEach((item) => {
    let product = getProduct(item);
    const newItem = {
      deliveryDate: item.deliveryDate,
      name: product.name,
      quantity: item.quantity,
      image: product.image,
      productId: item.productId
    };
    orderedCart[0].items.push(newItem);
  });
  orderedCart[0].total = getCartTotal();
  orderHistory.push(orderedCart);
  clearCart();

  localStorage.setItem("orderedCart", JSON.stringify(orderedCart));
  localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
}
