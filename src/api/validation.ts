import { z } from "zod";

export const ERROR_INVALID_FORM_DATA = 'Invalid form data';
export const ERROR_FEEDBACK_DATA = 'Invalid feedback data';
export const ERROR_SIGNUP = 'Signup failed';
export const ERROR_SIGNIN = 'Signin failed';

export const taskIdSchema = z.string();

export const taskSchema = z.object({
  name: z.string().min(3),
  priority: z.string(),
  due_date: z.coerce.date().refine((data) => data > new Date(Date.now() - 3600 * 1000), {message: 'Due date must be in the future'}),
  });

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
  