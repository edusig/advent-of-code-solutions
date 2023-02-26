const input = await Deno.readTextFile('../../input.txt');

const lines = input.split('\n');

const scoreDict = {
  X: 1,
  Y: 2,
  Z: 3,
  A: 1,
  B: 2,
  C: 3,
};

const final = lines.reduce((sum, line) => {
  const [op, me] = line.split(' ');
  const base = scoreDict[me];
  if ((op === 'A' && me === 'X') || (op === 'B' && me === 'Y') || (op === 'C' && me === 'Z'))
    return sum + base + 3;
  else if ((op === 'A' && me === 'Y') || (op === 'B' && me === 'Z') || (op === 'C' && me === 'X'))
    return sum + 6 + base;
  else return sum + base;
}, 0);
console.log(final);

const second = lines.reduce((sum, line) => {
  const [op, me] = line.split(' ');
  if (me === 'X') {
    const play = op === 'A' ? 'Z' : op === 'B' ? 'X' : 'Y';
    return sum + scoreDict[play];
  } else if (me === 'Y') {
    const play = op === 'A' ? 'X' : op === 'B' ? 'Y' : 'Z';
    return sum + scoreDict[play] + 3;
  } else {
    const play = op === 'A' ? 'Y' : op === 'B' ? 'Z' : 'X';
    return sum + scoreDict[play] + 6;
  }
}, 0);
console.log('second', second);
