import './App.css';
import Weather from './views/Weather/Weather';
import Home from "./views/Home/Home";
import {  BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {
  return( 
    <BrowserRouter>
      <Switch>
        <Route path='/weather' component={Weather}/>
        <Route path="/" component={Home}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
