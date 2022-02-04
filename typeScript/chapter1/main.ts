function getFinalPrice(price: number, discount: number){
    return price / discount;
}

console.log(getFinalPrice(100, 10));
//console.log(getFinalPrice(100, '10%'));