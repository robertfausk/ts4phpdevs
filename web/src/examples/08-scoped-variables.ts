/**
 * cheat sheet: scoped variables
 */

interface CartItem {
    product: string;
    quantity: number;
    price: number;
}


interface ShoppingCart {
    push(item: CartItem): void;
    getTotal(): number;
    getItems(): CartItem[];
}
//
// const amyCart: ShoppingCart = {
//     getItems: [],
//     getTotal() {
//         return this.items.reduce(
//             (sum, item) => sum + (item.quantity * item.price),
//             0
//         )
//     }
// }

export function createCart(): ShoppingCart {
    const items: CartItem[] = [];

    return {
        getItems(): CartItem[] {
            return [...items];
        }, getTotal(): number {
            return 0;
        },
        push(item: CartItem):void {
            items.push(item);
        }
    }
}
const myCart = createCart();
myCart.push({product: 'mug', quantity: 12, price: 47});

