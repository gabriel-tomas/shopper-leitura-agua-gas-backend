export const isValidDateTime =(dateTimeString: string): boolean => {
  // Regex para validar o formato "YYYY-MM-DD HH:MM:SS"
  const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  return regex.test(dateTimeString);
}