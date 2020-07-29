export const capitalizeFirstLetters = (str) => {
  let words = str.split(' ');

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(' ');
};

export const getDayName = (date) =>
  date.toLocaleString('en-US', { weekday: 'short' });

export const getThisDayHours = (hourlyWeather, thisDayUNIXDate, timezone) => {
  let result = [];

  hourlyWeather.forEach((hour) => {
    if (
      getDayFromUNIX(hour.dt, timezone) ===
      getDayFromUNIX(thisDayUNIXDate, timezone)
    ) {
      result.push(hour);
    }
  });

  return result;
};

export const isCurrentHour = (date) => {
  const diff = Date.now() - date.getTime();
  return diff < 3600000 && diff >= 0;
};

const getDayFromUNIX = (timestamp, timezone) => {
  return new Date(timestamp * 1000).toLocaleString('en-US', {
    day: 'numeric',
    timeZone: timezone,
  });
};
