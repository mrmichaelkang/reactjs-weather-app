import React, { useState } from 'react';
import {Typography, TextField, Button, Grid} from '@material-ui/core';
import './Home.css';

function Home() {
  const [location, setLocation] = useState("");

  return (
    <div className='form-container'>
      <form  action="/weather">
        <Typography className='header' variant='h2' align='center'>Weather App</Typography>
        <Grid style={{width: "70%"}} container direction='row' justify='center' alignItems='center' className='search-container'>
          <Grid item xs={11} sm={11}>
            <TextField variant='outlined' className='search' onChange={(e) => setLocation(e.target.value)} name='location' value={location} id="standard-basic" label="Enter city's name/zip code" />
          </Grid>
          <Grid item xs={1} sm={1}> 
            <Button className='search-btn' variant='contained' color='primary' type='submit'>Search</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
  
}
export default Home;