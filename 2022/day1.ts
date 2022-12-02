const puzzleData = await Deno.readTextFile('./data/day1-a.txt');
const elves = puzzleData.split('\n\n')
    .map(meals => meals
        .split('\n')
        .reduce((p,n) => (Number.parseInt(n) || 0) + p,0));

const day1Answer = Math.max(...elves);

console.log(`day1A:  ${day1Answer}`);

const day2Answer = elves
    .sort((a, b) => a < b ? 1 : -1)
    .slice(0, 3)
    .reduce((p, n) => p + n, 0);

console.log(`day1B:  ${day2Answer}`);

console.log('one day in the books');
