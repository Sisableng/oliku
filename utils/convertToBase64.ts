export const convertToBase64 = (
  file: File,
  callback: (base64: string) => void
) => {
  const reader = new FileReader();

  reader.onload = () => {
    callback(reader.result as string);
  };

  reader.readAsDataURL(file);
};
