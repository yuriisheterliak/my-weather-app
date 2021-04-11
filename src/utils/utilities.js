export const toFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

export const capitalizeFirstLetters = (str) => {
  let words = str.split(' ');

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(' ');
};

export const getDayName = (timestampSec) => {
  const date = new Date(timestampSec * 1000);
  return date.toLocaleString('en-US', { weekday: 'short' });
};

export const isCurrentHour = (timestampSec) => {
  const diff = Date.now() - timestampSec * 1000;
  return diff < 3600000 && diff >= 0;
};

export const getFormattedTime = (timestampSec, timeFormat, timezone) => {
  return new Date(timestampSec * 1000).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: timeFormat,
    timeZone: timezone,
  });
};

export const getDayOfMonth = (timestampSec, timezone) => {
  return new Date(timestampSec * 1000).toLocaleString('en-US', {
    day: 'numeric',
    timeZone: timezone,
  });
};

export const isToday = (timestampSec) => {
  const todayDate = new Date();
  const someDate = new Date(timestampSec * 1000);
  return (
    someDate.getDate() === todayDate.getDate() &&
    someDate.getMonth() === todayDate.getMonth() &&
    someDate.getFullYear() === todayDate.getFullYear()
  );
};
