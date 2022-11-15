/**
 * Cheat sheet: primitive types in TS and JS
 */

// There is no difference between an integer and a float
// Everything is a number

const a: number = 42;
const b: number = 47.11;

// gives me runtime type as a string
console.log(typeof a, a);
console.log(typeof b, b);
// console.log(c);

// booleans are either true or false
const c: boolean = true;
const d: boolean = false;
const e: boolean = a > b;

console.log(typeof c, c, d, e);

// tring literals and template string
const f: string = 'Hello World!';
const g: string = `the answer is ${a}.`;
const h: string = `the answer is ${e}.`;

console.log(typeof f, f, g, h);

// Special tyoe "undefined"
const i: undefined = undefined;
console.log(typeof i,i, i === undefined);  // undefined undefined true // warning in PHPSTORM because undefined is a type and a literal

export {};