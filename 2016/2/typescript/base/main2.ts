const input = await Deno.readTextFile('../../input.txt');

const commands = input.split('\n');

console.log('COMMANDS', commands);

let cur: [number, number] = [0, 2];

const m = [
  [null, null, '1', null, null],
  [null, '2', '3', '4', null],
  ['5', '6', '7', '8', '9'],
  [null, 'A', 'B', 'C', null],
  [null, null, 'D', null, null],
];

const dirFns: Record<string, ([x, y]: [number, number]) => [number, number]> = {
  U: ([x, y]: [number, number]) => (isMovePossible([x, y - 1]) ? [x, y - 1] : [x, y]),
  D: ([x, y]: [number, number]) => (isMovePossible([x, y + 1]) ? [x, y + 1] : [x, y]),
  L: ([x, y]: [number, number]) => (isMovePossible([x - 1, y]) ? [x - 1, y] : [x, y]),
  R: ([x, y]: [number, number]) => (isMovePossible([x + 1, y]) ? [x + 1, y] : [x, y]),
};

const isMovePossible = ([x, y]: [number, number]) => {
  console.log('IS MOVE POSSIBLE', { x, y });
  if (x < 0 || y < 0 || y >= m.length || x >= m[y].length) return false;
  return m[y][x] != null;
};

let passcode = '';

commands.forEach((dirString) => {
  const dirs = dirString.split('');
  dirs.forEach((dir) => {
    if (Object.hasOwn(dirFns, dir)) {
      cur = dirFns[dir](cur);
    }
  });
  passcode += m[cur[1]][cur[0]];
});

console.log('PASSCODE', passcode);
