// https://briangrinstead.com/blog/astar-search-algorithm-in-javascript/
const input = await Deno.readTextFile('../../input.txt');

let start: Node = { x: 0, y: 0, elevation: 0 };
let end: Node = { x: 0, y: 0, elevation: 25 };

const map = input.split('\n').map((line, rowIdx) =>
  line.split('').map((char, colIdx) => {
    const elevation = char === 'S' ? 0 : char === 'E' ? 25 : char.charCodeAt(0) - 97;
    const node = { x: colIdx, y: rowIdx, elevation };
    if (char === 'S') start = node;
    if (char === 'E') end = node;
    return node;
  }),
);

console.log(start, end);

interface Node {
  x: number;
  y: number;
  elevation: number;
  parent?: Node;
}

class AStar {
  private readonly map: number[][];
  constructor(private readonly map: number[][]) {
    this.map = map;
  }
}
