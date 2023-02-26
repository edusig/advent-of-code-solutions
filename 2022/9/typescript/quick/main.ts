const input = await Deno.readTextFile('../../input.txt');

const moves = input.split('\n').map((line) => line.split(' '));

const displayGrid = (size: number, knotPos: number[][], visitedPos: Set<string>) => {
  const knowPosStr = knotPos.map((it) => it.join(','));
  return Array.from(new Array(size))
    .map((_, row) => {
      return (
        Array.from(new Array(size))
          .map((__, col) => {
            const pos = [col - size / 2, row - size / 2];
            const posStr = pos.join(',');
            if (posStr === knowPosStr[0]) {
              return 'H';
            } else if (posStr === knowPosStr[knotPos.length - 1]) {
              return 'T';
            } else if (knowPosStr.includes(posStr)) {
              return knowPosStr.indexOf(posStr);
            } else if (visitedPos.has(posStr)) {
              return '#';
            } else {
              return '.';
            }
          })
          .join('') + '\n'
      );
    })
    .join('');
};

const moveKnots = (moves: string[][], knotCount: number, viewGrid = false) => {
  const knotPos = Array.from(new Array(knotCount)).map(() => [0, 0]);
  const visitedPos = new Set<string>();
  moves.forEach(([dir, value]) => {
    const [dx, dy] = dir === 'U' ? [0, 1] : dir === 'D' ? [0, -1] : dir === 'R' ? [1, 0] : [-1, 0];
    const steps = parseInt(value);
    for (let i = 0; i < steps; i++) {
      knotPos.forEach((knot, idx) => {
        if (idx === 0) {
          knot[0] += dx;
          knot[1] += dy;
        } else {
          const prevKnot = knotPos[idx - 1];
          if (Math.abs(prevKnot[0] - knot[0]) > 1) {
            knot[0] += prevKnot[0] - knot[0] > 0 ? 1 : -1;
            if (Math.abs(prevKnot[1] - knot[1]) > 0) {
              knot[1] += prevKnot[1] - knot[1] > 0 ? 1 : -1;
            }
          }
          if (Math.abs(prevKnot[1] - knot[1]) > 1) {
            knot[1] += prevKnot[1] - knot[1] > 0 ? 1 : -1;
            if (Math.abs(prevKnot[0] - knot[0]) > 0) {
              knot[0] += prevKnot[0] - knot[0] > 0 ? 1 : -1;
            }
          }
          if (idx === knotCount - 1) {
            visitedPos.add(knot.join(','));
          }
        }
      });
      if (viewGrid) console.log(displayGrid(120, knotPos, visitedPos));
    }
  });
  console.log('VISITED', knotCount, visitedPos.size);
};

moveKnots(moves, 2);
moveKnots(moves, 10);
