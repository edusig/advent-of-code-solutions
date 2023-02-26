const input = await Deno.readTextFile('../../input.txt');
// const input = '(13x2)(7x2)ABCDEFGH';
// const input = '(75x4)(22x8)XBUQNQXMZPOAACRFZACRVP(2x2)HV(33x10)HTJYEBCTFDFRIXRIUBWJJXFDNGBIVATET';

const len = input.length;
const inputArr = input.split('');

export const decompress = () => {
  let decompressed = '';
  let i = 0;
  while (i < len) {
    if (inputArr.at(i) === '(') {
      const closeFind = inputArr.slice(i + 1, i + 11);
      const closeIdx = closeFind.indexOf(')');
      const [chars, rep] = inputArr
        .slice(i + 1, i + closeIdx + 1)
        .join('')
        .split('x');
      const repStr = inputArr.slice(closeIdx + 2, closeIdx + 2 + parseInt(chars)).join('');
      decompressed += Array.from(new Array(parseInt(rep)))
        .map(() => repStr)
        .join('');
      i = i + closeIdx + 2 + parseInt(chars);
    } else {
      decompressed += inputArr.at(i);
      i++;
    }
  }
  console.log('DECOMPRESSED', decompressed.length, decompressed);
};

// decompress();

// Part 2
const calculateLen = (v: string[], depth = 0) => {
  let i = 0;
  let resLen = 0;
  const len = v.length;
  const spacing = Array.from(new Array(depth * 4)).map(() => ' ');
  console.log(`${spacing.join('')}CALCULATE LEN OF`, v.join(''));
  while (i < len) {
    if (v.at(i) === '(') {
      const nextI = i + 1;
      const closeFind = v.slice(nextI, nextI + 10);
      const closeIdx = closeFind.indexOf(')');
      const afterIdx = nextI + closeIdx + 1;
      const [chars, rep] = v
        .slice(nextI, nextI + closeIdx)
        .join('')
        .split('x');
      const nChars = parseInt(chars);
      const nRep = parseInt(rep);
      const repStr = v.slice(afterIdx, afterIdx + nChars);
      resLen += nRep * (repStr.indexOf('(') !== -1 ? calculateLen(repStr, depth + 1) : nChars);
      console.log(
        `${spacing.join('')}  REP`,
        repStr.join(''),
        nRep * (repStr.indexOf('(') !== -1 ? calculateLen(repStr, depth + 1) : nChars),
      );
      i = afterIdx + nChars;
    } else {
      i++;
      resLen++;
    }
  }
  console.log(`${spacing.join('')}RESPONSE LEN OF`, resLen, v.join(''));
  return resLen;
};

export const decompressV2 = () => {
  const resLen = calculateLen(inputArr);
  console.log('LENGTH', resLen, inputArr.length);
};

decompressV2();
