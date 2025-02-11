import { z } from "zod";

export const ERROR_INVALID_FORM_DATA = 'Invalid form data';
export const ERROR_FEEDBACK_DATA = 'Invalid feedback data';

export const taskIdSchema = z.string();

export const taskSchema = z.object({
    name: z.string().min(3),
    priority: z.string(),
    due_date: z.coerce.date(),
  });
  