import { compareSync, genSaltSync, hashSync } from 'bcrypt-ts';

export const saltAndHashPassword = (pw: string) => {
  const salt = genSaltSync(10);
  const hash = hashSync(pw, salt);
  return hash;
};

export const compareHashPassword = (pw: string, hashedPw: string) => {
  const check = compareSync(pw, hashedPw);
  return check;
};
