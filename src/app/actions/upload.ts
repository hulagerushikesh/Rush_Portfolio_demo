'use server';

import { adminBucket } from '@/lib/firebase/admin';
import { requireSessionUser } from '@/lib/firebase/session';

const MAX_BYTES = 5 * 1024 * 1024;

export async function uploadImage(formData: FormData) {
  await requireSessionUser();

  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0) {
    return { success: false as const, error: 'No file selected.' };
  }
  if (!file.type.startsWith('image/')) {
    return { success: false as const, error: 'Only image files are allowed.' };
  }
  if (file.size > MAX_BYTES) {
    return { success: false as const, error: 'Image must be smaller than 5MB.' };
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const path = `media/${Date.now()}-${safeName}`;

  try {
    const blob = adminBucket().file(path);
    await blob.save(Buffer.from(await file.arrayBuffer()), {
      contentType: file.type,
      metadata: { cacheControl: 'public, max-age=31536000' },
    });
    await blob.makePublic();

    return {
      success: true as const,
      url: `https://storage.googleapis.com/${adminBucket().name}/${path}`,
    };
  } catch {
    return { success: false as const, error: 'Upload failed. Please try again.' };
  }
}
