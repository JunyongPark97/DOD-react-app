import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Mainpage from './components/Mainpage';
import FloatingButton from './components/FloatingButton'
import CreatePage from './components/CreatePage';
import ProjectLinkPage from './components/ProjectLinkPage'

function App() {
  
  return (
    <div className="App">
      <div className='main-box'>
        <Router>
          <Switch>
            <Route path='/' exact component={Mainpage}/>
            <Route path='/create' exact component={CreatePage}/>
            <Route path='/projectlink' exact component={ProjectLinkPage}/>
          </Switch>
        </Router>
        <FloatingButton/>
      </div>
    </div>
  );
}

export default App;
