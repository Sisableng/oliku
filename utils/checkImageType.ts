const isBase64 = (str: string): boolean => {
  try {
    // Check if the string starts with a valid data URL header for base64
    const base64Regex = /^data:[\w+.-]+\/[\w+.-]+;base64,/;
    return base64Regex.test(str);
  } catch (err) {
    return false;
  }
};

const isURL = (str: string): boolean => {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(str);
};

export const checkImageType = (value: string): string => {
  const base64 = isBase64(value);
  const url = isURL(value);
  if (base64) {
    return 'base64';
  } else if (url) {
    return 'url';
  } else {
    return 'unknown';
  }
};
