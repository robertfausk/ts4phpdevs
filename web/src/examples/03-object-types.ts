/**
 * Cheat sheet: object, arrays, functions
 */

// Objects
const user: { name: string, email?: string } = {name: 'John Doe'};
user.email = 'john.doe@example.com'; // we can modify the object, although it's const because we modify the object and not the pointer to the object

console.log(typeof user, user); // all objects at runtime are of type object

// Arrays
const luckyNumbers: number[] = [4,13,31];
luckyNumbers.push(42); // we can modify array itself and not the variable

console.log(typeof [], typeof luckyNumbers, luckyNumbers, Array.isArray(luckyNumbers)); // object, object, ..., true // u can push properties to array

// Tuples
const nameAndAge: (string|number)[] = ['John', 42]
const nameAndAgeA: [string, number] = ['John', 42]
// const nameAndAgeB: [string, number] = ['John', 42, 'complain'];
// nameAndAgeA[0] = 42; // forbid
// nameAndAgeA[1] = '42'; // forbid
const age = nameAndAgeA[1]
console.log(age);

// generic arrays
const users: {name: string, email: string}[] = [];
const usersA: Array<{name: string, email: string}> = [];
const usersB: Array<object> = [];
users.push({name: 'John DOe', email: 'jd@ex.com'});
usersA.push({name: 'John DOe', email: 'jd@ex.com'});
usersB.push({name: 'John DOe', email: 'jd@ex.com'});

console.log(users);
console.log(usersA);
console.log(usersB);
console.log(typeof users, users, Array.isArray(users)); // we do not get any further info at runtime

// Functions

// disallowed at strict level
// function add(a, b) {
//     return a + b;
// }
function add(a: number, b: number): number {
    return a + b;
}
// same same // classic declaration
const add2 = function (a: number, b: number): number {
    return a + b;
}
// same same // arrow function
const add3 = (a: number, b: number): number => a + b

// expecting a function of one type
const add4: (a: number, b: number) => number = (a: number, b: number): number => a + b
// types in declaration can be inferred
const add5: (a: number, b: number) => number = (a, b) => a + b

console.log(typeof add4, add4, add4(1,3)); // output: function [Function: add4] 4

// null - not a primitive - it's an object
const nothing: null = null;
console.log(typeof nothing, nothing, nothing === null); // output: object null true

export {};