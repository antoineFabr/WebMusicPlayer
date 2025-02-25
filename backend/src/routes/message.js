const success = (header, message, data, image) => {
  return {
    header: header,
    message: message,
    videoId: data,
    image: image,
  };
};

export { success };
