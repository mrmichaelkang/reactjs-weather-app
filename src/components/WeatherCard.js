import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';

import './WeatherCard.css';

function WeatherCard({day, mainTemp, minTemp, maxTemp, icon, desc, month, date}) {
  mainTemp = Math.floor(Number(mainTemp));
  minTemp = Math.floor(Number(minTemp));
  maxTemp = Math.floor(Number(maxTemp));
  
  return (
    <Card className="weather-card">
      <CardHeader className="weather-color weather-header" title={day}/>
      <CardContent className='weather-color weather-content'>
        <Typography variant='h4' align='center'>
          {`${month}/${date}`}
        </Typography>
        <Typography align='center'>
          <img alt="{desc} icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`}></img>
        </Typography>
        <Typography  variant='h5' align='center'>{desc}</Typography>
        <Typography align='center' variant='h4'>{`${mainTemp}°F`}</Typography>
        {/* <Typography align='center' variant='body1'>Min Temp: {minTemp}</Typography> */}
        {/* <Typography align='center' variant='body1'>Max Temp: {maxTemp}</Typography> */}
      </CardContent>
    </Card>
  )
}
 
export default WeatherCard;