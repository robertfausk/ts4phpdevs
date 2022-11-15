/**
 * cheat sheet: generic interfaces
 */

interface Shirt {
    name: string;
    size: 'XL' | 'L' | 'M' | 'S' | 'XS';
}

interface Mug {
    name: string;
    color: 'black' | 'white';
}

function printShirt({name, size}: Shirt) {
    console.log(name, size);
}

interface KeyValuePair<TKey, TValue> {
// interface KeyValuePair {
    key: TKey;
    // key: any;
    value: TValue;
    // value: any;
}

const shirtProduct: KeyValuePair<string, Shirt> = {
// const shirtProduct: KeyValuePair = {
    key: '4711',
    value: {name: 'Shirt', size: 'XL'}

}
const mugProduct: KeyValuePair<string, Mug> = {
// const mugPRoduct: KeyValuePair = {
    key: '0815',
    value: {name: 'Mug', color: 'black'}
}

// this passes the type check
printShirt(shirtProduct.value);
// printShirt(mugProduct.value); // does not compile

export {};