export function validateNonEmpty<T>(value: T | undefined | null, message: string) : T {
  if (!value) {
    let str = '';
    try {
      str = JSON.stringify(value);
    } catch {
      console.error('Error occurred while serializing ' + value)
    }
    throw new Error(message + ' ' + str);
  }
  else {
    return value;
  }
};

export const normalizeTitle = (text: string) => '#' + text.toLowerCase().replace(/ /g, '-');
