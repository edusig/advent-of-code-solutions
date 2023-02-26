const input = await Deno.readTextFile('../../input.txt');

const triangles: [number, number, number][] = input
  .split('\n')
  .map((it) => [
    parseInt(it.substring(2, 5)),
    parseInt(it.substring(7, 10)),
    parseInt(it.substring(12, 15)),
  ]);

const checkValidTriangle = ([a, b, c]: [number, number, number]): boolean =>
  a + b > c && a + c > b && b + c > a;

let validCount = 0;
triangles.forEach((it) => {
  if (checkValidTriangle(it)) validCount++;
});
console.log('VALID COUNT', validCount);

const verticalTriangles: [number, number, number][] = [];
input.split('\n').forEach((it, idx) => {
  if (idx % 3 === 0) verticalTriangles.push([], [], []);
  const baseRow = Math.floor(idx / 3) * 3;
  verticalTriangles[baseRow].push(parseInt(it.substring(2, 5)));
  verticalTriangles[baseRow + 1].push(parseInt(it.substring(7, 10)));
  verticalTriangles[baseRow + 2].push(parseInt(it.substring(12, 15)));
});

let verticalValidCount = 0;
verticalTriangles.forEach((it) => {
  if (checkValidTriangle(it)) verticalValidCount++;
});
console.log('VERTICAL VALID COUNT', verticalValidCount);
