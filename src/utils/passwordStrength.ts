const passwordRequirements = [
  { label: '8+ characters', test: (value: string) => value.length >= 8 },
  { label: 'Uppercase letter', test: (value: string) => /[A-Z]/.test(value) },
  { label: 'Lowercase letter', test: (value: string) => /[a-z]/.test(value) },
  { label: 'Number', test: (value: string) => /\d/.test(value) },
  { label: 'Special character', test: (value: string) => /[^A-Za-z0-9]/.test(value) },
];

export function getPasswordRequirements() {
  return passwordRequirements;
}

export function getPasswordStrength(password: string) {
  const score = passwordRequirements.filter((requirement) => requirement.test(password)).length;

  if (score <= 2) {
    return { label: 'Weak', value: 34, color: 'error.main' };
  }

  if (score <= 4) {
    return { label: 'Medium', value: 67, color: 'warning.main' };
  }

  return { label: 'Strong', value: 100, color: 'success.main' };
}
