export const toNumericString = (str: string) => {
  return str.replace(/[^0-9]/g, '');
}