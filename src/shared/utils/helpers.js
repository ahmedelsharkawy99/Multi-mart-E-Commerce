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
