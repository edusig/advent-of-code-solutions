const input = await Deno.readTextFile('../../input.txt');
// const input = `aaaaa-bbb-z-y-x-123[abxyz]
// a-b-c-d-e-f-g-h-987[abcde]`;

interface InputItem {
  value: string;
  sum: number;
  checkStr: string;
  line: string;
}

const parseLine = (line: string): InputItem | InputItem[] => {
  const dashParts = line.split('-');
  const lastParts = dashParts.at(-1)?.replace(']', '').split('[');
  if (lastParts == null || lastParts.length <= 1) {
    console.error('INVALID LINE', line);
    return [];
  }
  return {
    value: dashParts.slice(0, dashParts.length - 1).join(''),
    sum: parseInt(lastParts[0]),
    checkStr: lastParts[1],
    line: dashParts.slice(0, dashParts.length - 1).join(' '),
  };
};

const validateItem = (item: InputItem) => {
  const rank: Record<string, number> = {};
  item.value.split('').forEach((c) => {
    if (!Object.hasOwn(rank, c)) rank[c] = 0;
    rank[c] = rank[c] + 1;
  });
  const sorted = Object.keys(rank).sort((a, b) => {
    if (rank[a] > rank[b]) return -1;
    if (rank[a] < rank[b]) return 1;
    return a.charCodeAt(0) - b.charCodeAt(0);
  });
  console.log({ sorted: sorted.slice(0, 5).join(''), rank, item });
  return sorted.slice(0, 5).join('') === item.checkStr;
};

const lines = input.split('\n').flatMap(parseLine);
const finalSum = lines.reduce((sum, it) => sum + (validateItem(it) ? it.sum : 0), 0);
console.log('FINAL SUM', finalSum);

// PART 2
const validItems = lines.filter((it) => validateItem(it));
console.log('VALID ITEMS', validItems);
validItems.forEach((item) => {
  const rot = item.sum % 26;
  const dec = item.line
    .split('')
    .map((c) => (c === ' ' ? c : String.fromCharCode(((c.charCodeAt(0) - 97 + rot) % 26) + 97)))
    .join('');
  console.log('DECRIPTED', dec, item.sum);
});
