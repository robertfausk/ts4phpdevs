console.log('Hello World!');

let a = 1;
// let b: any = 2;
let b: unknown = 2;

// b =  'foo';

// b = b;
// b.reduce();

if (typeof b === 'string') { // fool the compiler
    console.log(a + b);
}
console.log(a + (b as string)); // fool the compiler
console.log(a + (b as any)); // fool the compiler; tell the compiler to not check this
// console.warn(a+b);
// console.error(a+b);