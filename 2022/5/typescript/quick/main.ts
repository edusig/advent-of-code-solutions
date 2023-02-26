const input = await Deno.readTextFile('../../input.txt');

/**
 *
    [C]             [L]         [T]
    [V] [R] [M]     [T]         [B]
    [F] [G] [H] [Q] [Q]         [H]
    [W] [L] [P] [V] [M] [V]     [F]
    [P] [C] [W] [S] [Z] [B] [S] [P]
[G] [R] [M] [B] [F] [J] [S] [Z] [D]
[J] [L] [P] [F] [C] [H] [F] [J] [C]
[Z] [Q] [F] [L] [G] [W] [H] [F] [M]
 1   2   3   4   5   6   7   8   9 
 */

const lines = input.split('\n');

const stacksInp = [
  'GJZ',
  'CVFWPRLQ',
  'RGLCMPF',
  'MHPWBFL',
  'QVSFCG',
  'LTQMZJHW',
  'VBSFH',
  'SZJF',
  'TBHFPDCM',
];

const stacks = stacksInp.map((it) => it.split('').reverse());

// lines.forEach((line) => {
//   const [_, qtt, ori, dest] = /move (\d+) from (\d+) to (\d+)/gi.exec(line);
//   for (let i = 0; i < qtt; i++) {
//     const el = stacks[parseInt(ori) - 1].pop();
//     if (el) stacks[parseInt(dest) - 1].push(el);
//   }
// });

// console.log(stacks);

// Part2

lines.forEach((line) => {
  const [_, qtt, ori, dest] = /move (\d+) from (\d+) to (\d+)/gi.exec(line);
  const oriStack = stacks[parseInt(ori) - 1];
  const els = oriStack.splice(oriStack.length - qtt, qtt);
  stacks[parseInt(dest) - 1].push(...els);
  // for (let i = 0; i < qtt; i++) {
  //   const el = stacks[parseInt(ori) - 1].pop();
  //   if (el) stacks[parseInt(dest) - 1].push(el);
  // }
});

console.log(stacks);
