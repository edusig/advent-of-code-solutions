const input = await Deno.readTextFile('../../input.txt');
// const input = '7-90,99-99';

const lines = input.split('\n');

const reps = lines.reduce((acc, line) => {
  const [a, b] = line.split(',');
  const [aMin, aMax] = a.split('-');
  const [bMin, bMax] = b.split('-');
  const aMinInt = parseInt(aMin);
  const aMaxInt = parseInt(aMax);
  const bMinInt = parseInt(bMin);
  const bMaxInt = parseInt(bMax);
  const aInsideB = aMinInt >= bMinInt && aMaxInt <= bMaxInt;
  const bInsideA = bMinInt >= aMinInt && bMaxInt <= aMaxInt;
  return acc + (aInsideB || bInsideA ? 1 : 0);
}, 0);

console.log('reps', reps);

// Part 2

const overlap = lines.reduce((acc, line) => {
  const [a, b] = line.split(',');
  const [aMin, aMax] = a.split('-');
  const [bMin, bMax] = b.split('-');
  const aMinInt = parseInt(aMin);
  const aMaxInt = parseInt(aMax);
  const bMinInt = parseInt(bMin);
  const bMaxInt = parseInt(bMax);
  const overlapA = aMinInt <= bMaxInt && aMaxInt >= bMinInt;
  const overlapB = bMinInt <= aMaxInt && bMaxInt >= aMinInt;
  return acc + (overlapA && overlapB ? 1 : 0);
}, 0);

console.log('overlap', overlap);
