const input = await Deno.readTextFile('../../input.txt');

let fourChars: string[] = [];
input.split('').forEach((c, idx) => {
  if (fourChars.includes(c)) fourChars = [];
  fourChars.push(c);
  if (fourChars.length >= 4) {
    console.log({ fourChars, c, idx });
  }
  // Part 2
  if (fourChars.length >= 14) {
    console.log({ fourChars, c, idx });
  }
});
