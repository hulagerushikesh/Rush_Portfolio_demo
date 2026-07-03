'use server';

import { revalidatePath } from 'next/cache';
import nodemailer from 'nodemailer';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { contactFormSchema } from '@/lib/validations';

export async function submitContactMessage(
  data: { name: string; email: string; subject: string; message: string }
) {
  const parsed = contactFormSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false as const, error: 'Please check your inputs and try again.' };
  }

  if (!isSupabaseConfigured()) {
    return {
      success: false as const,
      error: 'The contact form is temporarily unavailable — please email me directly instead.',
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('messages').insert(parsed.data);

  if (error) {
    return { success: false as const, error: 'Something went wrong. Please try again.' };
  }

  await sendContactNotification(parsed.data);

  revalidatePath('/admin/messages');
  return { success: true as const };
}

async function sendContactNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_NOTIFY_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return;

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: SMTP_USER,
      to: CONTACT_NOTIFY_EMAIL || SMTP_USER,
      replyTo: data.email,
      subject: `[Portfolio Contact] ${data.subject}`,
      text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
    });
  } catch (err) {
    console.error('Contact notification email failed:', err);
  }
}

export async function markMessageRead(id: string, read: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from('messages').update({ read }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/messages');
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('messages').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/messages');
}
