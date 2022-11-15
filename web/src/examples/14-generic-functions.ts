/**
 * cheat sheet: generic functions
 */

interface Person {
    name: string;
}

function greet({name}: Person): void {
    console.log(`Hello ${name}`);
}

function getRandomElement<TItem>(items: TItem[]): TItem {
// function getRandomElement(items: any[]): any {
    if (items.length < 1) {
        throw 'This array is empty!';
    }

    const index = Math.floor(Math.random() * items.length);

    return items[index];
}

const persons: Person[] = [{name: 'John'}, {name: 'Jane'}];

const randomPerson = getRandomElement(persons);

// we pass thetype check
greet(randomPerson);

const numbers = [1, 2, 3, 42];
const randomNumber = getRandomElement(numbers);

// this will not compile // but with any instead of TItem it would
// greet(randomNumber);

export {};