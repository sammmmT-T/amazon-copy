import { cart, deleteFromCart, getCartLength } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { centsToDollars } from "../../data/utils/money.js";
import { deliveryOptionHTML } from "../../data/utils/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

import  dayjs  from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

document.addEventListener('DOMContentLoaded', ()=>{
  renderCheckoutPage();
  updateDeliveryDates();
})

export function renderCheckoutPage() {
  const currentDate = dayjs();

  let orderSummaryHtml = "";
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem);
    const html = `
            <div class="cart-item-container js-cart-item-container-id-${
              cartItem.productId
            }">
              <div class="delivery-date">
                Delivery date: Tuesday, June 21
              </div>
    
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${product.image}">
    
                <div class="cart-item-details">
                  <div class="product-name">
                    ${product.name}
                  </div>
                  <div class="product-price">
                  $${centsToDollars(product.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${
                        cartItem.quantity
                      }</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary 
                        js-delete-link" data-product-id="${
                          cartItem.productId
                        }">
                      Delete
                    </span>
                  </div>
                </div>
    
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionHTML(currentDate, cartItem.productId, cartItem.deliveryChoice)}
                </div>
              </div>
            </div>
            `;
    orderSummaryHtml = html + orderSummaryHtml;
  });

  document.querySelector(".order-summary").innerHTML = orderSummaryHtml;
  updateCheckoutQuantity();
}


// Event listener for deleting item in cart in checkout page
document.querySelector(".order-summary").addEventListener("click", (event) => {
  // For deleting item in order summary
  const deleteButton = event.target.closest(".js-delete-link");
  if (deleteButton) {
    const { productId } = deleteButton.dataset;
    deleteFromCart(productId);
    updateCheckoutQuantity();
    renderPaymentSummary();

    const container = document.querySelector(
      `.js-cart-item-container-id-${productId}`
    );
    container.remove();
  }

  // Updating delivery date for items
  const choice = event.target.closest(".delivery-option") || null;
  if(choice){
    updateDeliveryDates(choice);
  }
});


function updateDeliveryDates(choice){
  if(choice){
    const input = choice.querySelector('.delivery-option-input');
    input.checked = true;
  }

  const containers = document.querySelectorAll('.cart-item-container');
  containers.forEach((container) => {
    const buttons = container.querySelectorAll('.delivery-option-input');
    
    buttons.forEach((button, index) => {
      if(button.checked){
        const { deliveryDate } = button.dataset;
        container.querySelector('.delivery-date').innerHTML = `Delivery date: ${deliveryDate}`;
      }
    })
  })
  renderPaymentSummary();
}

function updateCheckoutQuantity(){
  document.querySelector(".js-checkout-quantity").innerHTML = getCartLength();
}