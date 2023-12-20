export const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

export const filteredProductsHandler = (arr, value) => {
  if (!value) return arr;
  const filteredProducts = arr.filter((product) => product.category === value);
  return filteredProducts;
};

// ***Here is code for converting "Base64" to javascript "File Object".***

const toDataURL = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    // Handle any errors that occurred during the fetch or reading process
    console.error("Error in toDataURL:", error);
    throw error;
  }
};

function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

// *** Calling both function ***
export const userImagePlaceholders = async function (url) {
  const dataUrl = await toDataURL(url);
  const dataFile = dataURLtoFile(dataUrl, "user-icon.png");
  return dataFile;
};

const loadImage = (file) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      image.src = e.target.result;
    };

    reader.onerror = (error) => {
      reject(error);
    };

    image.onload = () => {
      resolve(image);
    };

    image.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

const calculateNewDimensions = (image, maxWidth, maxHeight) => {
  let newWidth = maxWidth;
  let newHeight = maxHeight;

  const aspectRatio = image.width / image.height;

  if (newWidth / newHeight > aspectRatio) {
    newWidth = newHeight * aspectRatio;
  } else {
    newHeight = newWidth / aspectRatio;
  }

  return { newWidth, newHeight };
};

export const compressImages = async (file, maxWidth, maxHeight, quality) => {
  if (!file) throw new Error("Please select an image");

  const image = await loadImage(file);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const { newWidth, newHeight } = calculateNewDimensions(
    image,
    maxWidth,
    maxHeight
  );
  canvas.width = newWidth;
  canvas.height = newHeight;

  context.drawImage(image, 0, 0, newWidth, newHeight);

  const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
  const newImageFile = dataURLtoFile(compressedDataUrl, file.name);

  return newImageFile;
};
