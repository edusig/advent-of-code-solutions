import { crypto } from 'https://deno.land/std/crypto/mod.ts';

const createMD5Hash = async (data: string) => {
  const md5Value = new Uint8Array(
    await crypto.subtle.digest('MD5', new TextEncoder().encode(data)),
  );
  const response = Array.from(md5Value)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return response;
};

const input = 'uqwqemis';

const checkHash = (hash: string) => hash.startsWith('00000');

export const part1 = async () => {
  let password = '';
  let idx = 0;
  while (password.length < 8) {
    const hash = await createMD5Hash(`${input}${idx}`);
    if (checkHash(hash)) {
      password = password + hash.charAt(5);
    }
    if (idx % 25000 === 0) {
      console.log('IDX', password, idx, hash);
    }
    idx++;
  }
  console.log('FOUND PASSWORD', password);
};

const displayPassword = (v: string[]) => v.map((c) => (c != null ? c : '_')).join('');

export const part2 = async () => {
  let password: string[] = Array.from(new Array(8));
  let foundChars = 0;
  let idx = 4_000_000;
  while (foundChars < 8 && idx < 200_000_000) {
    const hash = await createMD5Hash(`${input}${idx}`);
    const position = parseInt(hash.charAt(5));
    if (checkHash(hash) && !Number.isNaN(position) && position < 8 && password[position] == null) {
      password[position] = hash.charAt(6);
      foundChars++;
      console.log('FND', displayPassword(password), idx, position, hash);
    } else if (checkHash(hash)) {
      console.log('INV', displayPassword(password), idx, position, hash);
    }
    if (idx % 50000 === 0) {
      console.log('IDX', displayPassword(password), idx, hash);
    }
    idx++;
  }
  console.log('FOUND PASSWORD', password);
};

// part1()
// FND password = 694190cd | 26326685 7 000007d44ea65d0437b810035fec92f2
// part2();
