import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().nonempty('Email is required').regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
});
