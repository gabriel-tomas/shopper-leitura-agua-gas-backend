export const validateBase64 = (image: string) => {
  return RegExp(/^data:((?:\w+\/(?:(?!;).)+)?)((?:;[\w\W]*?[^;])*),(.+)$/).test(image);
}