const input = await Deno.readTextFile('../../input.txt');

const lines = input.split('\n');
const priority = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const final = lines.reduce((sum, line) => {
  const half = line.length / 2;
  const first = line.split('').slice(0, half);
  const second = line.split('').slice(half);
  const same = first.find((it) => second.includes(it));
  if (same != null) {
    const value = priority.indexOf(same) + 1;
    return sum + value;
  }
  return sum;
}, 0);

console.log(final);

let second = 0;
for (let i = 0; i < lines.length; i += 3) {
  const [a, b, c] = [lines[i], lines[i + 1], lines[i + 2]];
  const same = priority.split('').find((it) => a.includes(it) && b.includes(it) && c.includes(it));
  if (same != null) second += priority.indexOf(same) + 1;
  console.log('LOOP', { i, a, b, c, same });
}

console.log('SECOND', second);
