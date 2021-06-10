import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Mainpage from './components/Mainpage';

function App() {
  window.onbeforeunload = function(){
    
  }
  return (
    <div className="App">
      <div className='main-box'>
        <Router>
          <Switch>
            <Route path='/' exact component={Mainpage}/>
          </Switch>
        </Router>

      </div>
    </div>
  );
}

export default App;
