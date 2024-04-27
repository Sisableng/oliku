type CustomOptiosn = {
  width: string;
};

export const optimized = (
  val: string,
  width: number = 150,
  height: number = 150
) => {
  const originalUrl = val;
  const transformationParams = `c_thumb,h_${height},w_${width}`;
  const parts = originalUrl.split('/upload/'); // Split the URL at '/upload/'

  if (parts.length === 2) {
    // If the URL was split into two parts, insert the transformationParams between them
    let modifiedUrl: string = '';

    if (height === 150 && width > 150) {
      modifiedUrl = `${parts[0]}/upload/${`w_${width}`}/${parts[1]}`;
    } else {
      modifiedUrl = `${parts[0]}/upload/${transformationParams}/${parts[1]}`;
    }

    return modifiedUrl;
  } else {
    // console.error('Invalid Cloudinary URL format');
    return originalUrl;
  }
};
