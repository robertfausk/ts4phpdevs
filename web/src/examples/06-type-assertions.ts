/**
 * Cheat sheet: type assertions
 */

type CartItem = {name: string, quantity: number, price: number};
type ShoppingCart = CartItem[];
type CartValue = (cartJson: string) => number;

const serializedShoppingcart: string = `[
  {"name" : "t-shirt", "quantity": 5, "price": 5},
  {"name" : "mug", "quantity": 2, "price": 12},
  {"name" : "stickers", "quantity": 1, "price": 8.5}
]`;

// a version of JSON.parse() that forces me to type-cast the result
function myJsonParse(json: string): unknown {
    return JSON.parse(json);
}

const calculateSerializedCartValue: CartValue = (cartJson) => {
    const cart = myJsonParse(cartJson) as ShoppingCart; // best to use
    const cartA: ShoppingCart = myJsonParse(cartJson) as ShoppingCart; // we repeat ourselves
    const cartB: ShoppingCart = JSON.parse(cartJson);
    // const cartB: ShoppingCart = myJsonParse(cartJson); // not compiling

    return cart.reduce(
        (sum, item) => sum + (item.quantity * item.price),
        0
    );
}

console.log(calculateSerializedCartValue(serializedShoppingcart));

export {};