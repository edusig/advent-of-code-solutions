const directions = ['north', 'east', 'south', 'west'];

let curDir = 0;
let posX = 0;
let posY = 0;

const input =
  'R1, R3, L2, L5, L2, L1, R3, L4, R2, L2, L4, R2, L1, R1, L2, R3, L1, L4, R2, L5, R3, R4, L1, R2, L1, R3, L4, R5, L4, L5, R5, L3, R2, L3, L3, R1, R3, L4, R2, R5, L4, R1, L1, L1, R5, L2, R1, L2, R188, L5, L3, R5, R1, L2, L4, R3, R5, L3, R3, R45, L4, R4, R72, R2, R3, L1, R1, L1, L1, R192, L1, L1, L1, L4, R1, L2, L5, L3, R5, L3, R3, L4, L3, R1, R4, L2, R2, R3, L5, R3, L1, R1, R4, L2, L3, R1, R3, L4, L3, L4, L2, L2, R1, R3, L5, L1, R4, R2, L4, L1, R3, R3, R1, L5, L2, R4, R4, R2, R1, R5, R5, L4, L1, R5, R3, R4, R5, R3, L1, L2, L4, R1, R4, R5, L2, L3, R4, L4, R2, L2, L4, L2, R5, R1, R4, R3, R5, L4, L4, L5, L5, R3, R4, L1, L3, R2, L2, R1, L3, L5, R5, R5, R3, L4, L2, R4, R5, R1, R4, L3'.split(
    ', ',
  );

const visited = new Set(['0,0']);

input.forEach((i) => {
  const dir = i.at(0);
  const dist = parseInt(i.slice(1), 10);
  console.log('FOR', { i, dir, dist });
  if (dir === 'R') curDir = curDir >= directions.length - 1 ? 0 : curDir + 1;
  if (dir === 'L') curDir = curDir <= 0 ? directions.length - 1 : curDir - 1;
  console.log('CUR DIR', directions[curDir]);
  let curVisited: string[] = [];
  switch (directions[curDir]) {
    case 'north': {
      curVisited = Array.from(new Array(dist - 1)).map((_, idx) => `${posX},${posY + (idx + 1)}`);
      posY += dist;
      break;
    }
    case 'east':
      curVisited = Array.from(new Array(dist - 1)).map((_, idx) => `${posX + (idx + 1)},${posY}`);
      posX += dist;
      break;
    case 'south':
      curVisited = Array.from(new Array(dist - 1)).map((_, idx) => `${posX},${posY - (idx + 1)}`);
      posY -= dist;
      break;
    case 'west':
      curVisited = Array.from(new Array(dist - 1)).map((_, idx) => `${posX - (idx + 1)},${posY}`);
      posX -= dist;
      break;
    default:
      break;
  }
  const visitedLocation = curVisited.find((it) => visited.has(it));
  if (visitedLocation != null) {
    const [visitedX, visitedY] = visitedLocation.split(',');
    console.log('\n\nVISITED ALREADY', {
      visitedX,
      visitedY,
      distance: Math.abs(parseInt(visitedX)) + Math.abs(parseInt(visitedY)),
    });
  }
  curVisited.forEach((it) => visited.add(it));
  console.log('DISTANCE', { posX, posY, distance: Math.abs(posX) + Math.abs(posY) });
});
