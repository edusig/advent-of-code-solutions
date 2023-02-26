const input = await Deno.readTextFile('../../input.txt');

const commands = input.split('\n');

console.log('COMMANDS', commands);

let cur = 5;

const dirFns: Record<string, (i: number) => number> = {
  U: (i: number) => (i > 3 ? i - 3 : i),
  D: (i: number) => (i <= 6 ? i + 3 : i),
  L: (i: number) => (i % 3 !== 1 ? i - 1 : i),
  R: (i: number) => (i % 3 > 0 ? i + 1 : i),
};

let passcode = '';

commands.forEach((dirString) => {
  const dirs = dirString.split('');
  dirs.forEach((dir) => {
    if (Object.hasOwn(dirFns, dir)) {
      cur = dirFns[dir](cur);
    }
  });
  passcode += cur.toString();
});

console.log('PASSCODE', passcode);
