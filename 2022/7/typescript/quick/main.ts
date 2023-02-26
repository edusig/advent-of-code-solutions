const input = await Deno.readTextFile('../../input.txt');

// const input = `$ cd /
// $ ls
// dir a
// 14848514 b.txt
// 8504156 c.dat
// dir d
// $ cd a
// $ ls
// dir e
// 29116 f
// 2557 g
// 62596 h.lst
// $ cd e
// $ ls
// 584 i
// $ cd ..
// $ cd ..
// $ cd d
// $ ls
// 4060174 j
// 8033020 d.log
// 5626152 d.ext
// 7214296 k`;

let curPath = '/';
type Node = { size: number; children: Tree; parent?: Node };
type Tree = Record<string, Node>;
const dirTree: Tree = { '/': { size: 0, children: {} } };

const resolvePathToTree = (path: string, tree: Tree) => {
  if (path === '/') return tree['/'];
  const [dir, ...rest] = path.split('/');
  const realDir = dir === '' ? '/' : dir;
  if (rest.length === 0) return tree[realDir];
  return resolvePathToTree(rest.join('/'), tree[realDir].children);
};

const addSizeToNodeParents = (node: Node, size: number) => {
  node.size += size;
  if (node.parent) addSizeToNodeParents(node.parent, size);
};

input.split('\n').forEach((line) => {
  if (line.startsWith('$ cd')) {
    if (line === '$ cd /') return;
    const path = line.split(' ')[2];
    if (path === '..') {
      curPath = curPath.split('/').slice(0, -1).join('/');
    } else {
      curPath = curPath !== '/' ? curPath.split('/').concat(path).join('/') : '/' + path;
    }
  } else if (line.startsWith('$ ls')) {
    return;
  } else {
    const [dirOrSize, name] = line.split(' ');
    const node = resolvePathToTree(curPath, dirTree);
    if (dirOrSize === 'dir') {
      node.children[name] = { size: 0, children: {}, parent: node };
    } else {
      const size = parseInt(dirOrSize);
      addSizeToNodeParents(node, size);
    }
  }
});

console.dir(dirTree, { depth: 4 });

const get100KLessDirs = (
  tree: Tree,
  acc: { name: string; size: number }[],
): { name: string; size: number }[] => {
  Object.entries(tree).forEach(([name, { size, children }]) => {
    if (size <= 100000) {
      acc.push({ name, size });
    }
    get100KLessDirs(children, acc);
  });
  return acc;
};

const resultDirs = get100KLessDirs(dirTree, []);
const result = resultDirs.reduce((acc, it) => acc + it.size, 0);
console.log('RES =', result);

const getDirList = (
  tree: Tree,
  acc: { name: string; size: number }[],
): { name: string; size: number }[] => {
  Object.entries(tree).forEach(([name, { size, children }]) => {
    const found = acc.find((it) => it.name === name);
    if (found) found.size += size;
    else acc.push({ name, size });
    getDirList(children, acc);
  });
  return acc;
};

const dirList = getDirList(dirTree, []);
console.log(dirList);
const systemSize = 70_000_000;
const minSize = 30_000_000;
const curSize = dirTree['/'].size;
const freeSize = systemSize - curSize;
const freeUp = minSize - freeSize;
console.log({ systemSize, minSize, freeSize, curSize, freeUp });
const dirBySize = dirList.sort((a, b) => b.size - a.size);
const freeDir = dirBySize.filter((it) => it.size >= freeUp);
console.log('FREE =', freeDir);
