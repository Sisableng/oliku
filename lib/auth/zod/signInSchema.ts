import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Kata sandi harus terdiri dari minimal 8 karakter')
  .regex(
    /(?=.*?[A-Z])/,
    'Kata sandi harus mengandung setidaknya satu huruf besar'
  )
  .regex(
    /(?=.*?[a-z])/,
    'Kata sandi harus mengandung setidaknya satu huruf kecil'
  )
  .regex(
    /(?=.*?[0-9])/,
    'Kata sandi harus mengandung setidaknya satu digit angka'
  )
  .regex(
    /(?=.*?[#?!@$%^&*-])/,
    'Kata sandi harus mengandung setidaknya satu karakter khusus'
  );

const signInSchema = z.object({
  username: z
    .string()
    .min(2)
    .max(50)
    .regex(/(?=.*?[a-z0-9_-]{3,15}$)/, 'Username tidak benar'),
  password: passwordSchema,
});

export default signInSchema;
