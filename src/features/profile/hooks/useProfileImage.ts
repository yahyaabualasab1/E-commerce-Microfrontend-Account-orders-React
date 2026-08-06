import { useRef, useState } from 'react';

const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxFileSize = 3 * 1024 * 1024;

export type ProfileImagePreview = {
  fileName: string;
  fileSize: number;
  dataUrl: string;
};

export function useProfileImage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<ProfileImagePreview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const openFilePicker = () => {
    setError(null);
    inputRef.current?.click();
  };

  const reset = () => {
    setPreview(null);
    setError(null);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleFileChange = (file: File | null) => {
    setError(null);

    if (!file) {
      return;
    }

    if (!acceptedTypes.includes(file.type)) {
      setError('Please choose a JPG, PNG, or WebP image.');
      return;
    }

    if (file.size > maxFileSize) {
      setError('Profile image must be 3 MB or smaller.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPreview({
          fileName: file.name,
          fileSize: file.size,
          dataUrl: reader.result,
        });
      }
    };
    reader.onerror = () => setError('Could not read this image file.');
    reader.readAsDataURL(file);
  };

  const savePhoto = async (onSave: (dataUrl: string) => void) => {
    if (!preview) {
      return;
    }

    setSaving(true);
    await new Promise((resolve) => window.setTimeout(resolve, 350));
    onSave(preview.dataUrl);
    setSaving(false);
    reset();
  };

  return {
    inputRef,
    preview,
    error,
    saving,
    openFilePicker,
    handleFileChange,
    savePhoto,
    reset,
  };
}
