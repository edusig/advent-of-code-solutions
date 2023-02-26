const input = await Deno.readTextFile('../../input.txt');

const commands = input.split('\n').map((line) => line.split(' '));

let nextX = 1;
const cycleValues: number[] = [];

commands.forEach((command) => {
  const [action, value] = command;
  if (action === 'noop') cycleValues.push(nextX);
  if (action === 'addx') {
    cycleValues.push(nextX, nextX);
    nextX += parseInt(value);
  }
});

console.dir(cycleValues.join(', '));

const importantCycles = [19, 59, 99, 139, 179, 219].map((idx) => cycleValues[idx] * (idx + 1));

console.log(importantCycles.reduce((sum, it) => sum + it, 0));

const screenWidth = 40;
const screenHeight = 6;
const screen = new Array(screenHeight).fill(0).map(() => new Array(screenWidth).fill('.'));

cycleValues.forEach((value, idx) => {
  const x = idx % screenWidth;
  const y = Math.floor(idx / screenWidth);
  console.log('CYCLE', { idx, value, x, y });
  screen[y][x] = x + 1 >= value && x + 1 < value + 3 ? '#' : '.';
});

console.log(screen.map((it) => it.join('')).join('\n'));
