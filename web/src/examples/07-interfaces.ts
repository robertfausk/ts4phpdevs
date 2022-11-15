/**
 * Cheat sheet: interfaces
 */

// bit differently than in php

type ShirtSize = 'XL' | 'L' | 'M' | 'S' | 'XS';

interface Product {
    name: string;
}

// equivalent declaration with aliases
type ProductOldSchool = {name: string}

// Interfaces support inheritance
interface Shirt extends Product {
    size: ShirtSize;
}

// equivalent declaration with aliases and intersection
type ShirtOldSchool = ProductOldSchool & {size: ShirtSize};

const largeShirt: Shirt = {
    name: 'A large Shirt',
    size: 'L'
};

// the interface does not exist at runtime
console.log(typeof largeShirt, largeShirt);

// interfaces can be composed of interfaces
interface CartItem {
    product: Product;
    quantity: number;
    price: number;
}

// interfaces may declare object methods
interface ShoppingCart {
    items: CartItem[];
    getTotal(): number;
}

const myCart: ShoppingCart = {
    items: [],
    getTotal() {
        return this.items.reduce(
            (sum, item) => sum + (item.quantity * item.price),
            0
        )
    }
}
const myCartA: ShoppingCart = {
    items: [],
    getTotal() {
        return this.items.reduce(
            (sum, item) => sum + (item.quantity * item.price),
            0
        )
    }
}

console.log(typeof myCart, myCart);
console.log(typeof myCartA, myCartA);

const mug: Product = {name: 'nice mug'};
myCart.items.push({product: mug, quantity: 12, price: 47});
myCartA.items.push({product: mug, quantity: 12, price: 47});

function useCartWithInterface(cart: ShoppingCart) {
    console.log(typeof cart, cart);
}

useCartWithInterface(myCart);
// difference to php
useCartWithInterface(myCartA); // can be used as interface in js even if it is not declared as interface

export {};