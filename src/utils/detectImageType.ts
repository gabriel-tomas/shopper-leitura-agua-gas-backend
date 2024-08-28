export const detectImageType = (base64Img: string) => {
  if (base64Img.charAt(0) === '/') return 'jpg';
  else if (base64Img.charAt(0) === 'i') return 'png';
  else if (base64Img.charAt(0).toUpperCase() === 'R') return 'png';
  else if (base64Img.charAt(0).toUpperCase() === 'U') return 'webp';
  else return 'png';
}