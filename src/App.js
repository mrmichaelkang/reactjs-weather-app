import './App.css';
import Weather from './views/Weather/Weather';
import Home from "./views/Home/Home";
import {  BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {
  return( 
    <>
    <BrowserRouter>
      <Switch>
        <Route path='/weather' component={Weather}/>
        <Route path="/" component={Home}/>
      </Switch>
    </BrowserRouter>
    <footer>
      &copy; Copyright <a href="https://www.mrmichaelkang.com">Michael Kang</a> 2021
      <p>Created with React.Js and Material-UI :)</p>
    </footer>
    </>
  )
}

export default App;
