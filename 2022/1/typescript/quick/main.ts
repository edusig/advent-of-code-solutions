const input = await Deno.readTextFile('../../input.txt');

const lines = input.split('\n');
let curElf = 0;
let elves: string[][] = [];
lines.forEach((line) => {
  if (line === '') return curElf++;
  elves[curElf] = [...(elves[curElf] ?? []), line];
});
const sums = elves
  .map((elf) => {
    return elf.reduce((sum, it) => sum + parseInt(it), 0);
  })
  .sort();

console.log('sums', JSON.stringify(sums));
