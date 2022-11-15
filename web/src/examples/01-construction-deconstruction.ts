/**
 * Cheat sheet: construction/deconstruction of objects
 */

// Object construction
const shirt = {};
const shirtA = { name: 'symfony con t-shirt', size: 'M'}; // u got typ completion now
shirtA.size = 'L';
const shirtB: {name: string, size: string} = { name: 'symfony con t-shirt', size: 'M'};
shirtB.size = 'L';
// shirtB.size = 42; // not possible
const mug = { name: 'symfony con mug', color: 'black'};

// Array construction
const items = [shirtA]; // array of items with size and name as property
items.push(shirtB)
// items.push(mug); // not possible
const itemsA = [shirtA, mug];
const itemsB = []; //: any
itemsB.push(shirtA);
itemsB.push(mug);
const itemsC: {name: string}[] = []; // u can push anything that has a name as property
itemsC.push(shirtA);
itemsC.push(mug);

const sticker = {name: 'Sticker offer'};

// Spread operator
const shirtOffer = {...shirtA, price: 15.99}; // all the properties that shirt and a price
const mugOffer = {...mug, price: 8};
const stickerOffer = {...sticker, price: 0.5};

const firstTwoOffers = [shirtOffer, mugOffer]
const offer = [...firstTwoOffers, stickerOffer];

// Array deconstruction
const firstOffer = offer[0]; // object with price and name
// console.log(firstOffer.size); // information is lost
// (firstOffer as any).size = 'M';
console.log((firstOffer as any).size); // information is not lost

const secondOffer = offer[1];

const [firstOfferA, secondOfferA] = offer; // also in PHP possible (same as list-function); array deconstruction
const [firstOfferB, secondOfferB, ...remainingOffers] = offer; // everything that is in this array

console.log('firstOffer: ', firstOfferB);
console.log('secondOffer: ', secondOfferB);
console.log('remainingOffers: ', remainingOffers);

// Object decostrution
const {price: shirtPrice, ...shirtWithoutPrice} = shirtOffer;

console.log('this shirt costs ', shirtPrice);
console.log('this is the shirt', shirtWithoutPrice);  // new object

// Object deconstruction
const itemNames = items.map((current => {return current.name}));
const itemNamesD = items.map((current => {return current.size}));
const itemNamesA = items.map((function (current) {
    return current.name
}));
const itemNamesB = items.map((function (current) {
    return current.name
}));
const itemNamesC = items.map(({name}) => name);

console.log(itemNames);
console.log(itemNamesA);
console.log(itemNamesB);
console.log(itemNamesC);
console.log(itemNamesD);


export {};