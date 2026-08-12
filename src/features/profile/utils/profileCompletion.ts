import type { AuthUser } from '../../../types/auth';

type CompletionField = {
  label: string;
  complete: boolean;
};

export function getProfileCompletion(user: AuthUser | null) {
  const fields: CompletionField[] = [
    { label: 'Profile image', complete: Boolean(user?.avatar) },
    { label: 'First name', complete: Boolean(user?.firstName?.trim()) },
    { label: 'Last name', complete: Boolean(user?.lastName?.trim()) },
    { label: 'Email', complete: Boolean(user?.email?.trim()) },
    { label: 'Phone', complete: Boolean(user?.phone?.trim()) },
    { label: 'Date of birth', complete: Boolean(user?.dateOfBirth?.trim()) },
    { label: 'Address', complete: Boolean(user?.address?.trim()) },
    { label: 'City', complete: Boolean(user?.city?.trim()) },
    { label: 'Country', complete: Boolean(user?.country?.trim()) },
    { label: 'Postal code', complete: Boolean(user?.postalCode?.trim()) },
    { label: 'Vehicle parts preference', complete: Boolean(user?.preferredCategories?.length) },
  ];
  const completed = fields.filter((field) => field.complete);

  return {
    total: fields.length,
    completed: completed.length,
    percentage: Math.round((completed.length / fields.length) * 100),
    missing: fields.filter((field) => !field.complete).map((field) => field.label),
  };
}
