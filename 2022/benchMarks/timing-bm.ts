import {solvePuzzle as sp2} from '../day2.ts';
import {solvePuzzle as sp4} from '../day4.ts';

Deno.bench("Solving Puzzle 2: ", { group: "Puzzle 2", baseline: true }, async () => {
    await sp2();
});


Deno.bench("Solving Puzzle 4: ", { group: "Puzzle 4", baseline: true }, async () => {
    await sp4();
});
