export function validateNonEmpty<T>(value: T | undefined | null, message: string): T {
  if (!value) {
    throw new Error(message);
  }
  else {
    return value;
  }
}

export const isLocalLink = (link: string) => link.indexOf('#') === 0;

export const normalizeLocalLink = (text: string) => '#' + text.toLowerCase().replace(/ /g, '-').replace(/\//g, '');
