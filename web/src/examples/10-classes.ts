/**
 * Cheat sheet: classes
 */

class CartItem {
    product: string;
    quantity: number;
    price: number;

    constructor(
        product: string,
        quantity: number,
        price: number,
    ) {
        this.product = product;
        this.quantity = quantity;
        this.price = price;
    }
    
    getTotal(): number {
        return this.price * this.quantity;
    }

    toString(): string {
        return `${this.quantity}x ${this.product} (${this.price} each): ${this.getTotal()}`;
    }
}

interface ShoppingCart {
    push(item: CartItem): void;

    getTotal(): number;

    getItems(): CartItem[];
}

// class InMemoryCart { // would also work
class InMemoryCart implements ShoppingCart{ // autocompletion with implements
    items: CartItem[] = [];

    push(item: CartItem): void {
        this.items.push(item);
    }

    getItems(): CartItem[] {
        return [...this.items];
    }
    getTotal(): number {
        return this.items.reduce(
            (subtotal, item) => subtotal + item.getTotal(),
            0,
        );
    }
}
const myCart: ShoppingCart = new InMemoryCart();
myCart.push(new CartItem('SymfonyCon T-Shirt', 8, 15.99));
myCart.push(new CartItem('Mug', 8, 2));

console.log(myCart.getTotal());
console.log(myCart.getItems()[0].toString());
console.log(myCart.getItems()[0].toString());

console.log(typeof myCart); //object

console.log(myCart.constructor.name); //name of the class // InMemoryCart // name of the constructor function


export {};