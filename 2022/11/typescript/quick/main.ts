const input = await Deno.readTextFile('../../input.txt');

interface Monkey {
  items: number[];
  op: (a: number) => number;
  div: number;
  t: number;
  f: number;
}

const add = (a: number | 'old') => (b: number) => a === 'old' ? b + b : a + b;
const multiply = (a: number | 'old') => (b: number) => a === 'old' ? b * b : a * b;

const monkeyInputs = input.split('\n\n');
const monkeys = monkeyInputs.map((monkeyInput): Monkey => {
  const [_, itemsLine, operationLine, testLine, trueLine, falseLine] = monkeyInput.split('\n');
  const items = itemsLine
    .split(':')[1]
    .trim()
    .split(', ')
    .map((item) => parseInt(item));
  const [opStr, value] = operationLine.split('=')[1].trim().replace('old', '').trim().split(' ');
  const div = parseInt(testLine.split('by ')[1]);
  const t = parseInt(trueLine.split('monkey ')[1]);
  const f = parseInt(falseLine.split('monkey ')[1]);
  const operationValue = value === 'old' ? 'old' : parseInt(value);
  const op = opStr === '+' ? add(operationValue) : multiply(operationValue);
  console.log('MONKEY', { items, opStr, operationValue, div, t, f });
  return { items, op, div, t, f };
});

// console.log('MONKEYS', monkeys);

const processRounds = (monkeys: Monkey[], rounds: number, part2 = false) => {
  const inspectionCounter = new Map<number, number>();
  // Most important part of part 2
  // By getting the maximum product of all divisors, we can keep the worry low  and
  // still get the correct thorwTo monkey
  const prod = monkeys.reduce((acc, { div }) => acc * div, 1);
  for (let i = 0; i < rounds; i++) {
    monkeys.forEach((monkey, mIdx) => {
      const { items, op, div, f, t } = monkey;
      items.forEach((item) => {
        const worry = part2 ? op(item) % prod : Math.floor(op(item) / 3);
        const throwTo = worry % div === 0 ? t : f;
        monkeys[throwTo].items.push(worry);
        inspectionCounter.set(mIdx, (inspectionCounter.get(mIdx) ?? 0) + 1);
      });
      monkeys[mIdx].items = [];
    });
  }
  return inspectionCounter;
};

// const inspections = processRounds(monkeys, 20);
// const sortedInspections = Array.from(inspections).sort((a, b) => b[1] - a[1]);
// const mostActive = sortedInspections.slice(0, 2);
// const monkeyBusiness = mostActive.reduce((acc, [_, value]) => acc * value, 1);
// console.log({ sortedInspections, monkeyBusiness, mostActive });

console.log('PART 2');
const inspections2 = processRounds(monkeys, 10_000, true);
const sortedInspections2 = Array.from(inspections2).sort((a, b) => b[1] - a[1]);
const mostActive2 = sortedInspections2.slice(0, 2);
const monkeyBusiness2 = mostActive2.reduce((acc, [_, value]) => acc * value, 1);
console.log({ sortedInspections2, monkeyBusiness2, mostActive2 });
