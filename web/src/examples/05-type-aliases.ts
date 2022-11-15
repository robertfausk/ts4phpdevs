/**
 * Cheat sheet: type aliases
 */

// we can declare shorthand aliases for complex tpe declarations
type ShirtSize = 'XL' | 'L' | 'M' | 'S' | 'XS';

type ProductArray = Array<{ name: string, size?: ShirtSize }>

type SizeFilter = (products: ProductArray, size: ShirtSize) => ProductArray;

// above has no equivalent in javascript; just virtual

const products: ProductArray = [];
products.push({name: '', size: 'L'});
products.push({name: '', size: 'L'});
products.push({name: 'med shirt', size: 'M'});
products.push({name: '', size: 'L'});
products.push({name: '', size: 'L'});
products.push({name: 'nice mug'});

console.log(typeof products, products);

const onlysizes: SizeFilter = (products, expectedSize) => products
    .filter(({size}) => size === expectedSize);

console.log(typeof onlysizes);
const mediumShirts = onlysizes(products, 'M');
console.log(mediumShirts);

export {};