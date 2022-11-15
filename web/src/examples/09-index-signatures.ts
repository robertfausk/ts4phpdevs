/**
 * cheat sheet: scoped variables
 */

interface Product {
    name: string;
    price: number;
}

const myCatalog: any = {};
myCatalog.PROD4177 = {name: 'Nice mug', price: 8};
myCatalog.PROD0815 = {name: 't-shirt', price: 18};

function getProduct(productId: string): Product | undefined {
    return myCatalog[productId];
}

function getProductBetter(productId: string): Product | null {
    if (undefined === myCatalog[productId]) {
        return null;
    }
    return myCatalog[productId];
}

console.log(getProduct('PROD4177'));
console.log(getProduct('PROD0815'));
console.log(getProduct('foo'));
console.log(getProductBetter('foo'));

interface Catalog {
    [key: string]: Product;
}

const myCatalogA: Catalog = {};
myCatalog.PROD4177 = {name: 'Nice mug', price: 8};
myCatalog.PROD0815 = {name: 't-shirt', price: 18};

function getProductA(productId: string): Catalog | null {
    if (undefined === myCatalog[productId]) {
        return null;
    }

    return myCatalog[productId];
}

console.log(getProductA('PROD0815'));
console.log(getProductA('foo'));


export {};