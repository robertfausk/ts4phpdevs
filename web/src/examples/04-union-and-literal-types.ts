/**
 * Cheat sheet: union and literal types
 */

// Union
let message: number | string | null = null;

console.log(typeof message, message); // object null // js runtime does not know about the type

message = 'Hello :smirk:';
console.log(typeof message, message); // string Hello :smirk:

message = 42;
console.log(typeof message, message); // number 42

// fun stuff with union

// literal types
let size: 'XL' | 'L' | 'M' | 'S' | 'XS' = 'L';
console.log(typeof size, size); // string L

// size = "E"; // error in IDE and compile error
size = "M";  // with autocompletion in IDE

let sizeA: 'XL' | 'L' | 'M' | 'S' | 'XS' | false = 'L';
console.log(typeof size, size); // string L
function doSomething(p: string) {

}

doSomething(sizeA);
sizeA = false;
// doSomething(sizeA); // will not compile
if (false !== sizeA) {
    doSomething(sizeA); // will compile
}

function doSomethingWithSize(size: 'XL' | 'L' | 'M' | 'S' | 'XS' | false) {
    if (false !== size) {
        doSomething(size); // will compile
    }
}

let month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 = 10;
console.log(typeof month, month); //number 10

export {};