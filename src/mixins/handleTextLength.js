export default (text, limit = 20) => {
  return text.length > limit ? `${text.split('').splice(0, 20).join('')}...` : text;
};