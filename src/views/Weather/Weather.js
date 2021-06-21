import { useEffect, useState } from "react";
import {setCityLocation} from '../../weather_config';
import  WeatherCard from '../../components/WeatherCard';
import { Grid, Typography, Button } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import queryString from 'query-string';

import './Weather.css'


function Weather() {
  const [data,setData] = useState([]);
  const { search } = useLocation();
  const values = queryString.parse(search);
  const cityName = values.location[0].toUpperCase() + values.location.substring(1)
  const url = setCityLocation(cityName);
  let [isLocation, setIsLocation] = useState(true);


  // eslint-disable-next-line
  useEffect(() => {
  
    fetchWeather();
    // eslint-disable-next-line
  }, []);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let dayPos = new Date().getDay();

// eslint-disable-next-line
  const fetchWeather = async () => {
    // Increment by 8 to get current weather for 5 days from 0 -> 8 -> 16 -> 24 -> 32
    // https://api.openweathermap.org/data/2.5/forecast?q=rialto&appid=87a68035993d3c657ffb0b61572d36e0&units=imperial
    console.log(url);
    const response = await fetch(url);
    let weatherData = await response.json();
    console.log(weatherData);

    setData([])
  
    if(weatherData.cod === '200') { 
      for(let index = 0; index < weatherData.list.length; index+= 8) {
        let description = weatherData.list[index].weather[0].description[0].toUpperCase()
          + weatherData.list[index].weather[0].description.substring(1);

        data.push( {
          currentTemp: weatherData.list[index].main.temp, 
          minTemp: weatherData.list[index].main.temp_min, 
          maxTemp: weatherData.list[index].main.temp_max,
          icon: weatherData.list[index].weather[0].icon,
          desc: description
        })
      } 
      setData(data);

      console.log(`Search: ${search}`);
      console.log(`Location: ${values.location}`)
  } else {
    setIsLocation(false);
    data.push( {
      currentTemp: null, 
      minTemp: null, 
      maxTemp: null,
      icon: null,
      desc: null
    });
  }

  }
  
  const generateWeekdayName = () => {
    return days[(dayPos < days.length) ? dayPos++ : (dayPos = 0, dayPos++)]
  }

  return (
    <div>
      <Typography className='header' variant='h2' align='center'>{ isLocation ? `${cityName}'s Current Weather` : 'Location Not Found' }</Typography>
      <Grid spacing={1} container direction='row' justify='center' alignItems='center'>
        {data.map(d => (
          <Grid item xs={12} sm={4} md={2}> 
            <WeatherCard day={generateWeekdayName()} 
            mainTemp={d.currentTemp} minTemp={d.minTemp} maxTemp={d.maxTemp} 
            icon={d.icon} desc={d.desc}/> 
          </Grid>
        ))}
      </Grid>
      <Grid container direction='column' className='search-again-btn' justify='center' alignItems='center'>
        <div>
          {isLocation ? null : <Typography  variant='h4' align='center'>{`${cityName} is not a location.`}</Typography>}
        </div>
        <Button className='search-again-btn' href='/' variant='contained' color='primary' type='submit'>
          Search again?
        </Button>
      </Grid>
    </div>
  );
}

export default Weather;