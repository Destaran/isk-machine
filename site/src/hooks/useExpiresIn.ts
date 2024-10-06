import { addDays } from 'date-fns';

export function useExpiresIn(issued: Date, duration: number) {
  const issuedDate = new Date(issued);
  const expiry = addDays(issuedDate, duration);
  const now = new Date();
  const difference = expiry.getTime() - now.getTime();
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
