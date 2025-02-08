export function centsToDollars(cents){
    return Number((cents/100).toFixed(2));
}

export function calculate(num1, num2, operation="+"){
    return Number(eval(`${num1} ${operation} ${num2}`).toFixed(2));
}