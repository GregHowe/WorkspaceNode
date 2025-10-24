export function validateEmail(email: string): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return '❌ Email is required';
  if (!emailRegex.test(email)) return '❌ Invalid email format';
  return '';
}
