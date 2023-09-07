export const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date * 1000).toLocaleDateString("en-US", options);
};

const toDataURL = (url) => {
  return fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          console.log(reader.result);
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
};

// ***Here is code for converting "Base64" to javascript "File Object".***

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
  try {
    const dataUrl = await toDataURL(url);
    console.log(dataUrl);
    const dataFile = dataURLtoFile(dataUrl, "user-icon.png");
    return dataFile;
  } catch (error) {
    throw error;
  }
};
