const input = await Deno.readTextFile('../../input.txt');

const bots = new Map<string, number[]>();
const outputs = new Map<string, number[]>();

const lines = input.split('\n');
let i = 0;
let passes = 0;
while (lines.length > 0) {
  if (i >= lines.length) {
    i = 0;
    passes++;
  }
  const line = lines[i];
  if (line.startsWith('value')) {
    const [_, value, bot] = /value (\d+) goes to bot (\d+)/gi.exec(line) as string[];
    bots.set(bot, [...(bots.get(bot) ?? []), +value]);
    // console.log('VALUE', +value, bot, bots);
    lines.splice(i, 1);
  } else {
    const [_, bot, lw, lid, hw, hid] =
      /bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/.exec(
        line,
      ) as string[];
    const botObj = bots.get(bot);
    if (passes > 0 && botObj != null && botObj.length === 2) {
      const [min, max] = botObj.toSorted();
      if (min === 17 && max === 61) {
        console.log('FOUND', bot, botObj);
      }
      // console.log('EXECUTE', { bot, botObj, low: `${lw} ${lid}`, high: `${hw} ${hid}`, bots });
      if (lw === 'bot') bots.set(lid, [...(bots.get(lid) ?? []), min]);
      else outputs.set(lid, [...(outputs.get(lid) ?? []), min]);
      if (hw === 'bot') bots.set(hid, [...(bots.get(hid) ?? []), max]);
      else outputs.set(hid, [...(outputs.get(hid) ?? []), max]);
      bots.delete(bot);
      // console.log('AFTER', bots);
      lines.splice(i, 1);
    } else {
      i++;
    }
  }
}

console.log('outputs', outputs);
