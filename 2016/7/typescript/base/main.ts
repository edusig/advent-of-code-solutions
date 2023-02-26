const input = await Deno.readTextFile('../../input.txt');

const checkABBA = (v: string) => {
  let mode: 'normal' | 'hyper' = 'normal';
  let abbaOutside = false;
  const vp = v.split('');
  for (let i = 0; i < v.length - 3; i++) {
    if (vp[i + 3] === '[') {
      mode = 'hyper';
      i += 4;
    }
    if (vp[i + 3] === ']') {
      mode = 'normal';
      i += 4;
    }
    if (vp[i] !== vp[i + 1] && vp[i] === vp[i + 3] && vp[i + 1] === vp[i + 2]) {
      if (mode === 'normal') abbaOutside = true;
      else return false;
    }
  }
  return abbaOutside;
};

let validCount = 0;
input.split('\n').forEach((line) => {
  if (checkABBA(line)) {
    console.log('LINE', line);
    validCount++;
  }
});
console.log('VALID COUNT', validCount);

// Part2

const checkABA = (v: string) => {
  let mode: 'normal' | 'hyper' = 'normal';
  const abas: string[] = [];
  const babs: string[] = [];
  const vp = v.split('');
  for (let i = 0; i < v.length - 2; i++) {
    if (vp[i + 2] === '[') {
      mode = 'hyper';
      i += 3;
    }
    if (vp[i + 2] === ']') {
      mode = 'normal';
      i += 3;
    }
    if (vp[i] !== vp[i + 1] && vp[i] === vp[i + 2]) {
      const str = vp.slice(i, i + 3).join('');
      if (mode === 'normal') abas.push(str);
      else babs.push(str);
    }
  }
  return (
    abas.find(
      (a) => babs.find((b) => a.charAt(0) === b.charAt(1) && a.charAt(1) === b.charAt(0)) != null,
    ) != null
  );
};

let validSSLCount = 0;
input.split('\n').forEach((line) => {
  if (checkABA(line)) {
    console.log('LINE', line);
    validSSLCount++;
  }
});
console.log('VALID COUNT', validSSLCount);
