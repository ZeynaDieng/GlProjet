export function getLocalData(key: string): string | null {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
}

export function setLocalData(key: string, value: string): void {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.setItem(key, value);
  }
}

export function removeLocalData(key: string): void {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.removeItem(key);
  }
}
export function clearLocalStorage(): void {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.clear();
  }
}