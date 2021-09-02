import { useEffect, useState } from "react";
import {setCityLocation, setCoordinates} from '../../weather_config';
import  WeatherCard from '../../components/WeatherCard';
import { Grid, Typography, Button } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import queryString from 'query-string';

import './Weather.css'


function Weather() {
  const [data,setData] = useState([]);
  let [isLocation, setIsLocation] = useState(true);
  const { search } = useLocation();
  const values = queryString.parse(search);
  const cityName = values.location[0].toUpperCase() + values.location.substring(1)
  let url = setCityLocation(cityName);
  // let url = "";
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let dayPos = new Date().getDay();
  const currentDate = new Date();
  let month = currentDate.getMonth() + 1;
  let date = currentDate.getDate();

  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position)
    console.log(`Lat: ${position.coords.latitude}`);
    console.log(`Lon: ${position.coords.longitude}`);
    url = setCoordinates(position.coords.latitude, position.coords.longitude);
  });


  // eslint-disable-next-line
  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line
  }, []);


  const getDaysInMonth = () => {
    return new Date(Number(currentDate.getFullYear()), currentDate.getMonth()  + 1, 0).getDate();
  }

  const getMonth = () => {
    if(date > getDaysInMonth()) {
      month += 1;
      return month;
    }
    return month;
  }

  const getDate = () => { 
    if (date > getDaysInMonth()) {
      date = 1;
      return date;
    }

    const tempDate = date;
    date = tempDate + 1;
    return tempDate;
  }


// eslint-disable-next-line
  const fetchWeather = async () => {
        
    console.log(url);
    const response = await fetch(url);
    let weatherData = await response.json();
    console.log("Weather Data: " + weatherData);

    setData([])
  
    if(weatherData.cod === '200') { 
      for(let index = 0; index < weatherData.list.length; index+= 8) {
        let description = weatherData.list[index].weather[0].description[0].toUpperCase()
          + weatherData.list[index].weather[0].description.substring(1).toLowerCase();

        data.push( {
          currentTemp: weatherData.list[index].main.temp, 
          minTemp: weatherData.list[index].main.temp_min, 
          maxTemp: weatherData.list[index].main.temp_max,
          icon: weatherData.list[index].weather[0].icon,
          desc: description
        })
      } 
      setData(data);

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
    return days[(dayPos < days.length) ? dayPos++ : (dayPos = 0, dayPos++)];
  }

  return (
    <div>
      <Typography className='header' variant='h2' align='center'>{ isLocation ? `${cityName}'s Current Weather` : 'Location Not Found' }</Typography>
      <Grid spacing={1} container direction='row' justify='center' alignItems='center'>
        {data.map(d => (
          <Grid item xs={12} sm={4} md={2}> 
            <WeatherCard day={generateWeekdayName()} 
            mainTemp={d.currentTemp} minTemp={d.minTemp} maxTemp={d.maxTemp} 
            icon={d.icon} desc={d.desc} month={getMonth()} date={getDate()}/> 
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