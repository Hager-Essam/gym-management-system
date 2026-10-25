// Pure functions: they take the form values and return an object of error messages.
// An empty object ({}) means "no errors". Keeping them separate from components makes them easy to test.

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export function validateLogin({ email, password }) {
  const errors = {};

  if (!email.trim()) errors.email = 'Email is required.';
  else if (!isEmail(email)) errors.email = 'Enter a valid email address.';

  if (!password) errors.password = 'Password is required.';

  return errors;
}

export function validateRegister({ fullName, email, password, confirmPassword, terms }) {
  const errors = {};

  if (!fullName.trim()) errors.fullName = 'Full name is required.';
  else if (fullName.trim().length < 2) errors.fullName = 'Name must be at least 2 characters.';

  if (!email.trim()) errors.email = 'Email is required.';
  else if (!isEmail(email)) errors.email = 'Enter a valid email address.';

  if (!password) errors.password = 'Password is required.';
  else if (password.length < 8) errors.password = 'Use at least 8 characters.';
  else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) errors.password = 'Include at least one letter and one number.';

  if (!confirmPassword) errors.confirmPassword = 'Please confirm your password.';
  else if (confirmPassword !== password) errors.confirmPassword = 'Passwords do not match.';

  if (!terms) errors.terms = 'You must accept the facility terms to continue.';

  return errors;
}
