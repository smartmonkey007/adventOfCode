export function sum(numbers: number[]): number {
    return numbers.reduce((current, next) => {
        return current + next;
    }, 0);
}