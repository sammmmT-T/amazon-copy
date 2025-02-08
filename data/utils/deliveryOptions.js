const deliveryOptions = [
    {
        deliveryInDays : 7,
        deliveryPrice : 'FREE',
    }, 
    {
        deliveryInDays : 3,
        deliveryPrice : 4.99,
    },
    {
        deliveryInDays : 1,
        deliveryPrice : 9.99,
    },
]

export function deliveryOptionHTML(currentDate, productId, deliveryChoice){
    let deliveryOption = '';

    for(let i = 0; i < deliveryOptions.length; i++){
        let checked = i+1 === deliveryChoice ? "checked" : "";

        const html = `
      <div class="delivery-option">
        <input type="radio" ${checked}
          class="delivery-option-input"
          name="delivery-option-1-${productId}"
          data-delivery-date="${currentDate.add(deliveryOptions[i].deliveryInDays, 'day').format('dddd, MMMM D')}">
        <div>
          <div class="delivery-option-date">
            ${currentDate.add(deliveryOptions[i].deliveryInDays, 'day').format('dddd, MMMM D')}
          </div>
          <div class="delivery-option-price">
            $${deliveryOptions[i].deliveryPrice}
          </div>
        </div>
      </div>
        `
        deliveryOption += html;
    }
    return deliveryOption;
}