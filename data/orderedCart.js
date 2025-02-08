export const orderedCart = JSON.parse(localStorage.getItem("orderedCart")) || [];

export const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
/*
    each element of the array is another cart array which is a history of an order
    
    orderHistory = [
        [item1, item2, item3], <-- march 1
        [item1, item2, item3], <-- april 5
    ]
*/


export let willPlaceOrder = false;
/*
    {
        deliveryDate : null,
        name : null,
        quantity : null,
        image : null,
    }
*/
