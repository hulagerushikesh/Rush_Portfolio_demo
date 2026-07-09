'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { DURATION, EASE_STANDARD } from '@/lib/motion';

export default function ImageUploadField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
}) {
  const [url, setUrl] = useState(defaultValue ?? '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const supabase = createClient();
    const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    const { error: uploadError } = await supabase.storage.from('media').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('media').getPublicUrl(path);
    setUrl(data.publicUrl);
    setUploading(false);
  };

  return (
    <div>
      <label className="form-label">{label}</label>
      <input type="hidden" name={name} value={url} readOnly />
      <input type="file" accept="image/*" className="form-input" onChange={onFileChange} disabled={uploading} />
      <AnimatePresence mode="wait">
        {uploading && (
          <motion.div
            key="uploading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast }}
            style={{ marginTop: '8px' }}
          >
            {/* Indeterminate shimmer while the file streams to Storage */}
            <div className="skeleton" style={{ height: '4px', borderRadius: 'var(--radius-full)' }} />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              Uploading…
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {error && <p className="form-error">{error}</p>}
      {url && !uploading && (
        <motion.img
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DURATION.base, ease: EASE_STANDARD }}
          src={url}
          alt="Preview"
          style={{ marginTop: '8px', maxHeight: '120px', borderRadius: 'var(--radius-md)' }}
        />
      )}
    </div>
  );
}
