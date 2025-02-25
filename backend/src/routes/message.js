const success = ( message, data, image) => {
  return {
     
    message: message,
    videoId: data,
    image: image,
  };
};

export { success };
