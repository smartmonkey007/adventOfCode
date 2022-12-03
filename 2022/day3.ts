import { sum } from '../utils/mathFunctions.ts';

const data = await Deno.readTextFile('./2022/data/day3-a.txt').then(rows => rows.split('\n'));

function getPriority(code: string): number {
    if (code.toLowerCase() === code) {
        return code.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    } else {
        return code.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
    }

}

const day1 = data.map(code => {
    const parts = [code.slice(0, code.length / 2), code.slice(code.length / 2)];
    let priority = 0;
    for (const part of parts[0]) {
        if (parts[1].search(part) >= 0) {
            priority = getPriority(part);
            break;
        }
    }
    return priority;

});

console.log(`Day 3a: ${sum(day1)}`);

let day2Result = 0;
for (let index = 0; index < data.length; index += 3) {
    for (const part of data[index]) {
        if (data[index + 1].search(part) >= 0 && data[index + 2].search(part) >= 0) {
            day2Result += getPriority(part);
            break;
        }
    }
}

console.log(`Day3b: ${day2Result}`);

