const puzzleData = await Deno.readTextFile('./2022/data/day2-a.txt');

function sum(numbers: number[]): number {
    return numbers.reduce((current, next) => {
        return current + next;
    }, 0);
}

function calcScore(
    prc: { [x: string]: { [x: string]: any; }; v: { [x: string]: any; }; }, 
    puzzleData: string,
    type: 1 | 2): number[] {
    return puzzleData
        .split('\n')
        .map(p => p.toLowerCase().split(' ') as ['a' | 'b' | 'c', 'x', 'y', 'z'])
        .map((game: ['a' | 'b' | 'c', 'x', 'y', 'z']) => {
            const score = prc[game[0]][game[1]] + (type === 1 ? prc.v[game[1]] : prc[game[0]].v[game[1]]);
            return score;
        });
}


let guide: any = {
    // x = Rock, y = paper, z = scissors
    // Rock
    a: {x: 3, y: 6, z: 0, v: 1 },
    // Paper
    b: { x: 0, y: 3, z: 6, v: 2 },
    // Scissors
    c: { x: 6, y: 0, z: 3, v: 3 },

    v: { x: 1, y: 2, z: 3 }
}

let games = calcScore(guide, puzzleData,1);

let score = sum(games);

console.log(`day 1a result:  ${score}`);

const guide2= {
    // rock 1, paper 2, scissors 3
    // x = lose, y = draw, z = win
    // Rock
    a: { x: 0, y: 3, z: 6, v: {x: 3, y: 1, z: 2} },
    // Paper
    b: { x: 0, y: 3, z: 6, v: { x: 1, y: 2, z: 3 } },
    // Scissors
    c: { x: 0, y: 3, z: 6, v: { x: 2, y: 3, z: 1 } },
} as any;

games = calcScore(guide2, puzzleData, 2);

score = sum(games);

console.log(`day 1b result:  ${score}`);

console.log('another day bites the dust');

