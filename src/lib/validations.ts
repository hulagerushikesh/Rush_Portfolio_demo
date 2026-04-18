import { z } from 'zod';

// Contact form validation
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Newsletter form validation
export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;
