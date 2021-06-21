const apiKey = "87a68035993d3c657ffb0b61572d36e0";
let city = "";
let url = "";

export function setCityLocation(data) {
  city = data;
  url = `https://api.openweathermap.org/data/2.5/forecast?q=` +
                    `${city}&appid=${apiKey}&units=imperial`;
  return url;
}

