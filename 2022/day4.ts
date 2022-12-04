const workAreas = [...(Array(200).keys())]

export async function solvePuzzle() {
    const puzzleData = await Deno.readTextFile(`./2022/data/day4-a.txt`);
    const workGroups = puzzleData
        .split('\n')
        .map(wg => wg.split(',')
            .map(workArea => {
                return expandWorkArea(workArea);
            }));

    let overlappingCount = 0;
    let anyOverlappingCount = 0;

    workGroups.forEach(wg => {
        if (checkOverlappingWorkGroup(wg)) {
            overlappingCount++;
        }
        if (checkOverlappingWorkGroup(wg, true)) {
            anyOverlappingCount++;
        }

    })

    console.log(`day1A: ${overlappingCount}`);
    console.log(`day2A: ${anyOverlappingCount}`);
}


function expandWorkArea(workArea: string): number[] {
    const [low, high] = workArea.split('-');
    return workAreas.slice(+low, +high + 1);
}


function checkOverlappingWorkGroup(workGroups: number[][], anyOverlap = false) {
    const [least, most] = workGroups[0].length < workGroups[1].length ?
        [workGroups[0], workGroups[1]] : [workGroups[1], workGroups[0]];
    
    const found = [];
    for (const item of least) {
        if (most.some(mostItem => mostItem === item)) {
            found.push(item);
        }
    }    

    return anyOverlap ? found.length > 0 :found.length === least.length;
}

if (import.meta.main) {
    solvePuzzle();
}
