/**
 * Cheat sheet: class member visibility and CPP
 */

class CartItem {
    public readonly product: string;
    private readonly price: number;

    constructor(
        product: string,
        price: number,
        private readonly quantity: number = 1,  // nicenstein // contructor property promotion
    ) {
        this.product = product;
        this.price = price;
    }

    public getTotal(): number {
        return this.price * this.quantity;
    }

    public get total(): number { // not a function anymore // can be used as property // readonly // gets updated when price/quantity changes
        return this.price * this.quantity;
    }

    public toString(): string {
        return `${this.quantity}x ${this.product} (${this.price} each): ${this.total}`;
    }
}

interface ShoppingCart {
    push(item: CartItem): void;

    getTotal(): number;

    getItems(): CartItem[];
}

// class InMemoryCart { // would also work
class InMemoryCart implements ShoppingCart { // autocompletion with implements
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
myCart.push(new CartItem('SymfonyCon T-Shirt', 15.99, 8));
myCart.push(new CartItem('Mug', 2));

console.log(myCart.getTotal());
console.log(myCart.getItems()[0].toString());
console.log(myCart.getItems()[0].toString());

console.log(typeof myCart); //object

console.log(myCart.constructor.name); //name of the class // InMemoryCart // name of the constructor function


const item = new CartItem('Wurst', 12);
console.log(item);  // not showing virtual property total and toString
console.log('Product: ' + item.product);
console.log('Total: ' + item.total)
console.log('getTotal(): ' + item.getTotal());

// console.log('Quantity: ' + item.quantity); // not possible because of private property
console.log('Quantity: ' + (item as any).quantity); // Runtime access is possible
(item as any).quantity = 7;
console.log('Quantity: ' + (item as any).quantity);
console.log(item.toString());

export {};