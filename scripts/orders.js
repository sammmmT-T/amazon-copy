import { orderHistory } from "../data/orderedCart.js";
import { getCartLength } from "../data/cart.js";

import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

updateCartQuantity();
generateOrdersPage();

function generateOrdersPage() {
  let ordersGridHTML = "";

  orderHistory.forEach((historyArray) => {
    let ordersHTML = generateOrderHeader(historyArray);

    historyArray[0].items.forEach((orderedItem) => {
      const html = `
        <div class="order-details-grid">
          <div class="product-image-container">
            <img src="${orderedItem.image}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${orderedItem.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${orderedItem.deliveryDate}
            </div>
            <div class="product-quantity">
              Quantity: ${orderedItem.quantity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        </div>
            `;
      ordersHTML += html;
    });
    let gridContainerHTML = `<div class="container-grid">${ordersHTML}</div>`;
    ordersGridHTML = gridContainerHTML + ordersGridHTML;
  });
  document.querySelector(".orders-grid").innerHTML = ordersGridHTML;
}

function generateOrderHeader(historyArray) {
  let day = dayjs().format("MMMM dddd");
  const html = `
    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${day}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$${historyArray[0].total}</div>
        </div>
      </div>

      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>${historyArray[0].items[0].productId}</div>
      </div>
    </div>
    `;

  return html;
}

function updateCartQuantity() {
  document.querySelector(".cart-quantity").innerHTML = getCartLength();
}
