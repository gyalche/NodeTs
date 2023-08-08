import { TypeOf, object, string } from 'zod';
export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password must be atleast 6 chars'),
    confirmPassword: string({
      required_error: 'Password is required',
    }).min(6, 'password must be atleast 6 chars'),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'password do not match',
    path: ['confirm password'],
  }),
});

export type createUserInput = TypeOf<typeof createUserSchema>;
