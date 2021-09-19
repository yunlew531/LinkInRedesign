export default (fileName, extension = 'png') =>
  new URL(`../assets/images/${fileName}.${extension}`, import.meta.url).href;