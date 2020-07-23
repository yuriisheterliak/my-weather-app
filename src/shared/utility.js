export const capitalizeFirstLetters = (str) => {
  let words = str.split(' ');

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(' ');
};

export const getDayName = (date) =>
  date.toLocaleString('en-US', { weekday: 'short' });
