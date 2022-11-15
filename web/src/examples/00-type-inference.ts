/**
 * Cheat sheet: type inference
 */

// TS will infer a and b as type 'number'
let a = 1;
let b = 2;

// this won't compile
// b = 'foo';

let myLuckyNumbers = [1, 4, 7, 42]; // number array
let myLuckyNumbersA: number[] = [1, 4, 7, 42]; // number array

myLuckyNumbers.push(43);
// this won't compile
// myLuckyNumbers.push('foo');

let myLuckyNumbersWithString = [1, 4, 7, 42, 'foo']; // array of string and number (use type hint of PHPStorm e.g.)
let myLuckyNumbersWithStringA: (number|string)[] = [1, 4, 7, 42, 'foo']; // array of string and number (use type hint of PHPStorm e.g.)
let myLuckyNumbersWithObject = [1, 4, 7, 42, 'foo', {'a': 'b'}]; // array of string and number (use type hint of PHPStorm e.g.)
let myLuckyNumbersWithObjectA: (number|string|{})[] = [1, 4, 7, 42, 'foo', {'a': 'b'}]; // array of string and number (use type hint of PHPStorm e.g.)
let myLuckyNumbersWithObjectB: (number|string|Object)[] = [1, 4, 7, 42, 'foo', {'a': 'b'}]; // array of string and number (use type hint of PHPStorm e.g.)
let myLuckyNumbersWithObjectC: (number|string|{a: string})[] = [1, 4, 7, 42, 'foo', {a: 'b'}]; // array of string and number (use type hint of PHPStorm e.g.)
let myLuckyNumbersWithObjectD: {a: string}[] = [{a: 'b'}]; // array of string and number (use type hint of PHPStorm e.g.)


// Tell TS that this is a module
export {};