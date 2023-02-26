const input = await Deno.readTextFile('../../input.txt');

// const input = `eedadn
// drvtee
// eandsr
// raavrd
// atevrs
// tsrnev
// sdttsa
// rasrtv
// nssdts
// ntnada
// svetve
// tesnvt
// vntsnd
// vrdear
// dvrsen
// enarar`;

const ranks: Record<string, number>[] = [{}, {}, {}, {}, {}, {}, {}, {}];

input.split('\n').forEach((line) => {
  line.split('').forEach((c, col) => {
    if (!Object.hasOwn(ranks[col], c)) ranks[col][c] = 1;
    else ranks[col][c] += 1;
  });
});

console.log('RANKS', ranks);

const response = ranks.map((it) => {
  return Object.keys(it)
    .sort((a, b) => it[b] - it[a])
    .at(0);
});

console.log('response', response.join(''));

const responsePart2 = ranks.map((it) => {
  return Object.keys(it)
    .sort((a, b) => it[a] - it[b])
    .at(0);
});
console.log('response part 2', responsePart2.join(''));
