// const input = await Deno.readTextFile('./input.txt');
const input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

const pairs = input.split('\n\n');

const compare = (a: unknown, b: unknown): boolean | null => {
  console.dir({ a, b }, { depth: 10 });
  if (typeof a === 'number' && typeof b === 'number') return a === b ? null : a < b;
  if (typeof a === 'number' && Array.isArray(b)) return compare([a], b);
  if (typeof b === 'number' && Array.isArray(a)) return compare(a, [b]);
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length === 0) return true;
    if (b.length === 0) return false;
    for (let i = 0; i < a.length; i++) {
      if (i >= b.length) break;
      const result = compare(a[i], b[i]);
      if (result != null) return result;
    }
    // return a.length < b.length;
  }
  // return false;
};

const rightOrder = pairs.map((pair, idx) => {
  const [a, b] = pair.split('\n').map((it) => JSON.parse(it));
  if (idx === 1) {
    // console.dir({ a, b, compare: compare(a, b) }, { depth: 10 });
    return compare(a, b);
  }
});

const sumRightOrder = rightOrder.reduce((acc, it) => acc + (it ? 1 : 0), 0);

console.log(rightOrder, sumRightOrder);
