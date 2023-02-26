const input = await Deno.readTextFile('../../input.txt');

const display = (s: boolean[][]) => {
  console.log();
  s.forEach((r) => console.log(r.map((c) => (c ? '#' : '.')).join('')));
};

const sH = 6;
const sW = 50;
const screen = Array.from(new Array(sH)).map(() => Array.from(new Array(sW).map(() => false)));
display(screen);

input
  .split('\n')
  // .slice(0, 6)
  .forEach((line) => {
    const args = line.split(' ');
    const command = args[0];
    if (command === 'rect') {
      const size = args[1];
      const [width, height] = size.split('x');
      for (let row = 0; row < parseInt(height); row++) {
        for (let col = 0; col < parseInt(width); col++) {
          screen[row][col] = true;
        }
      }
    }
    if (command === 'rotate') {
      const axis = args[1];
      const index = parseInt(args[2].split('=')[1]);
      const qtt = parseInt(args[4]);
      if (axis === 'column') {
        const colCells = [];
        for (let i = 0; i < sH; i++) {
          colCells.push(screen[i][index]);
        }
        colCells.forEach((col, i) => (screen[(i + qtt) % sH][index] = col));
      }
      if (axis === 'row') {
        const rowCells = screen[index].slice(0);
        rowCells.forEach((row, i) => (screen[index][(i + qtt) % sW] = row));
      }
    }
    display(screen);
  });

const litPixels = screen.reduce(
  (sum, row) => sum + row.reduce((acc, col) => acc + (col ? 1 : 0), 0),
  0,
);
console.log('LIT PIXELS', litPixels);
