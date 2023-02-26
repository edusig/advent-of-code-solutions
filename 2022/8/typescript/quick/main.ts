const input = await Deno.readTextFile('../../input.txt');
// const input = `30373
// 25512
// 65332
// 33549
// 35390`;

const treeGrid = input.split('\n').map((it) => it.split(''));

let visibleTrees = treeGrid.length * 2 + (treeGrid[0].length - 2) * 2;

const reduceTreeScenicScore =
  (treeA: number) => (acc: { count: number; ended: boolean }, treeB: number) => {
    if (acc.ended) return acc;
    if (treeA > treeB) return { ...acc, count: acc.count + 1 };
    else return { count: acc.count + 1, ended: true };
  };

const getCountInnerVisibleTrees = (treeGrid: string[][]) => {
  let count = 0;
  const visibilityArr = [];
  const scenicScores = [];
  for (let i = 1; i < treeGrid.length - 1; i++) {
    for (let j = 1; j < treeGrid[i].length - 1; j++) {
      // Columns
      const col = treeGrid.map((it) => parseInt(it[j]));
      const row = treeGrid[i].map((it) => parseInt(it));
      const treeA = row[j];
      // Slices
      const top = col.slice(0, i);
      const bot = col.slice(i + 1);
      const left = row.slice(0, j);
      const right = row.slice(j + 1);
      // Visibility
      const vTop = top.every((treeB) => treeB < treeA);
      const vBot = bot.every((treeB) => treeB < treeA);
      const vLeft = left.every((treeB) => treeB < treeA);
      const vRight = right.every((treeB) => treeB < treeA);
      const vis = vTop || vBot || vLeft || vRight;
      // Scenic score
      const sTop = top
        .slice(0)
        .reverse()
        .reduce(reduceTreeScenicScore(treeA), { count: 0, ended: false });
      const sBot = bot.reduce(reduceTreeScenicScore(treeA), { count: 0, ended: false });
      const sLeft = left
        .slice(0)
        .reverse()
        .reduce(reduceTreeScenicScore(treeA), { count: 0, ended: false });
      const sRight = right.reduce(reduceTreeScenicScore(treeA), { count: 0, ended: false });
      const scenicScore = sTop.count * sBot.count * sLeft.count * sRight.count;
      console.log({ sTop, sBot, sLeft, sRight, scenicScore });
      scenicScores.push(scenicScore);
      if (vis) {
        count++;
        visibilityArr.push({
          vis,
          vTop,
          vBot,
          vLeft,
          vRight,
          pos: [i, j],
        });
      }
    }
  }
  return { count, visibilityArr, scenicScores };
};

const innerVisible = getCountInnerVisibleTrees(treeGrid);
visibleTrees += innerVisible.count;

console.log({
  visibleTrees,
  height: treeGrid.length,
  width: treeGrid[0].length,
  innerVisibleCount: innerVisible.count,
  scenicScore: innerVisible.scenicScores.sort((a, b) => b - a),
});
