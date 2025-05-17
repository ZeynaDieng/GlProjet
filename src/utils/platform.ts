export function isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof navigator !== 'undefined';
  }
export function isMobile(): boolean {
    return isBrowser() && window.innerWidth < 768;
  }  