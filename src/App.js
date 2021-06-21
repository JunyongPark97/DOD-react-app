import './App.css';
import {useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Mainpage from './components/Mainpage';
import FloatingButton from './components/FloatingButton'
import CreatePage from './components/CreatePage';
import ProjectLinkPage from './components/ProjectLinkPage'
import DashboardPage from './components/DashboardPage';
import CheckPaymentPage from './components/CheckPaymentPage';
import Mypage from './components/Mypage';
import ResultPage from './components/ResultPage';

function App() {
  return (
    <div className="App">
      <div className='main-box'>
        <Router>
          <Switch>
            <Route path='/' exact component={Mainpage}/>
            <Route path='/create' exact component={CreatePage}/>
            <Route path='/projectlink' exact component={ProjectLinkPage}/>
            <Route path='/dashboard' exact component={DashboardPage}/>
            <Route path='/checkpayment' exact component={CheckPaymentPage}/>
            <Route path='/mypage' exact component={Mypage}/>
            <Route path='/link/:projectKey' component={ResultPage}/>
          </Switch>
        </Router>
        <FloatingButton/>
      </div>
    </div>
  );
}

export default App;
