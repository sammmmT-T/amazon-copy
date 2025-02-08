import { getCartLength, getCartTotal } from "../../data/cart.js";
import { calculate } from "../../data/utils/money.js";


export function renderPaymentSummary(){
    // Calculates values first and render them in page
    const cartTotal = getCartTotal();
    const shippingTotal = getShippingTotal();
    const totalBeforeTax = calculate(cartTotal, shippingTotal);
    const estimatedTax = calculate(totalBeforeTax, 0.1, "*");
    const orderTotal = calculate(totalBeforeTax, estimatedTax);
    
    const html = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${getCartLength()}):</div>
            <div class="payment-summary-money">$${cartTotal}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${shippingTotal}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalBeforeTax}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${estimatedTax}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${orderTotal}</div>
        </div>

        <a href="orders.html">
            <button class="place-order-button js-place-order-button button-primary">
                Place your order
            </button>
        </a>
    `
    document.querySelector('.js-payment-summary').innerHTML = html;
}

function getShippingTotal(){
    let shippingTotal = 0;
    const deliveryFare = [0, 4.99, 9.99];

    document.querySelectorAll('.delivery-options').
        forEach(deliveryOption => {
            const inputs = deliveryOption.querySelectorAll('.delivery-option-input')
            for(let i = 0; i < inputs.length; i++){
                if(inputs[i].checked){
                    shippingTotal += deliveryFare[i];
                    break;
                }
            }
        });
    
    console.log(`shipping total: ${shippingTotal}`)
    return shippingTotal;
}