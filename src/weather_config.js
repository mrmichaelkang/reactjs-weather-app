const apiKey = process.env.API_KEY;
let city = "";
let url = "";

export function setCityLocation(data) {
  city = data;
  url = `https://api.openweathermap.org/data/2.5/forecast?q=` +
                    `${city}&appid=${apiKey}&units=imperial`;
  return url;
}

export function setCoordinates(lat, lon) {
  url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial&exclude=daily,alert,minutely`;
  return url;
};