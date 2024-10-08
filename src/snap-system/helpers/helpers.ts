import * as bcrypt from 'bcrypt';

export function isNullOrUndefined<T>(
  obj: T | null | undefined,
): obj is null | undefined {
  return typeof obj === 'undefined' || obj === null;
}

export function generateHash(
  plainTest: string,
  saltRounds = 10,
): Promise<string> {
  return bcrypt.hash(plainTest, saltRounds);
}

export function verifyHash(plainText: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainText, hash);
}

export function generateRandomString(length = 10) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
