const enum Plays {
    rock = 'a',
    paper = 'b',
    scissors = 'c'
}

const enum GuideStrategyA {
    rock = 'x',
    paper = 'y',
    scissors = 'z'
}

const enum CountersWith {
    rock = 'x',
    paper = 'y',
    scissors = 'z'
}

const enum GuideStrategyB {
    lose = 'x',
    tie = 'y',
    win = 'z'
}

const enum PlayPoints {
    rock = 1,
    paper = 2,
    scissors = 3

}

const enum WinPoints {
    win = 6,
    tie = 3,
    lose = 0
}

type TypeGuide = {
    [key in Plays] : {[key in GuideStrategyA] : WinPoints} & {v: PlayPoints};
    } & {
    v: { [key in CountersWith]: PlayPoints }
}

const guide: TypeGuide = {
    [Plays.rock]: { 
        [GuideStrategyA.rock]: WinPoints.tie, 
        [GuideStrategyA.paper]: WinPoints.win, 
        [GuideStrategyA.scissors]: WinPoints.lose, 
        v: PlayPoints.rock },
    [Plays.paper]: { 
        [GuideStrategyA.rock]: WinPoints.lose, 
        [GuideStrategyA.paper]: WinPoints.tie, 
        [GuideStrategyA.scissors]: WinPoints.win, 
        v: PlayPoints.paper },
    [Plays.scissors]: { 
        [GuideStrategyA.rock]: WinPoints.win, 
        [GuideStrategyA.paper]: WinPoints.lose, 
        [GuideStrategyA.scissors]: WinPoints.tie, 
        v: PlayPoints.scissors },

    v: { [CountersWith.rock]: PlayPoints.rock,[CountersWith.paper]: PlayPoints.paper, [CountersWith.scissors]: PlayPoints.scissors }
}

type TypeGuideB = {
    [key in Plays]: { [key in GuideStrategyB]: WinPoints } &
    { v: { [key in GuideStrategyB]: PlayPoints } };
};

const guideB: TypeGuideB = {
    [Plays.rock]: {
        [GuideStrategyB.lose]: WinPoints.lose, [GuideStrategyB.tie]: WinPoints.tie, [GuideStrategyB.win]: WinPoints.win,
        v: {
            [GuideStrategyB.lose]: PlayPoints.scissors,
            [GuideStrategyB.tie]: PlayPoints.rock,
            [GuideStrategyB.win]: PlayPoints.paper
        }
    },
    [Plays.paper]: {
        [GuideStrategyB.lose]: WinPoints.lose, [GuideStrategyB.tie]: WinPoints.tie, [GuideStrategyB.win]: WinPoints.win,
        v: {
            [GuideStrategyB.lose]: PlayPoints.rock,
            [GuideStrategyB.tie]: PlayPoints.paper,
            [GuideStrategyB.win]: PlayPoints.scissors
        }
    },
    [Plays.scissors]: {
        [GuideStrategyB.lose]: WinPoints.lose, [GuideStrategyB.tie]: WinPoints.tie, [GuideStrategyB.win]: WinPoints.win,
        v: {
            [GuideStrategyB.lose]: PlayPoints.paper,
            [GuideStrategyB.tie]: PlayPoints.scissors,
            [GuideStrategyB.win]: PlayPoints.rock
        }
    },
};

function sum(numbers: number[]): number {
    return numbers.reduce((current, next) => {
        return current + next;
    }, 0);
}

function calcScore(
    prc: TypeGuide | TypeGuideB,
    puzzleData: string,
    type: 1 | 2): number[] {
    return puzzleData
        .split('\n')
        .map(p => p.toLowerCase().split(' ') as ['a' | 'b' | 'c', 'x' | 'y' | 'z'])
        .map((game) => {
            const score = prc[game[0]][game[1]] || 0;

            if (type === 1) {
                return score + ((prc as TypeGuide).v[game[1]] || 0);
            } else {
                return score + ((prc as TypeGuideB)[game[0]].v[game[1]] || 0);
            }
        });
}

export async function solvePuzzle() {

    const puzzleData = await Deno.readTextFile('./2022/data/day2-a.txt');

    let games = calcScore(guide, puzzleData, 1);

    let score = sum(games);

    console.log(`day 1a result:  ${score}`);

    games = calcScore(guideB, puzzleData, 2);

    score = sum(games);

    console.log(`day 1b result:  ${score}`);

    console.log('another day bites the dust');
}

if (import.meta.main) {
    solvePuzzle();
}



