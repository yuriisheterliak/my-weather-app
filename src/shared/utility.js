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

export const isCurrentHour = (timestamp) => {
  const diff = Date.now() - timestamp * 1000;
  return diff < 3600000 && diff >= 0;
};

export const getFormattedTime = (timestamp, timeFormat, timezone) => {
  return new Date(timestamp * 1000).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: timeFormat,
    timeZone: timezone,
  });
};

const getDayFromUNIX = (timestamp, timezone) => {
  return new Date(timestamp * 1000).toLocaleString('en-US', {
    day: 'numeric',
    timeZone: timezone,
  });
};
