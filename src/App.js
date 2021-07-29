import './App.css';
import {useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Mainpage from './components/Mainpage/Mainpage';
import FloatingButton from './components/common/FloatingButton'
import CreatePage from './components/CreateProject/CreatePage';
import ProjectLinkPage from './components/CreateProject/ProjectLinkPage'
import DashboardPage from './components/Dashboard/DashboardPage';
import CheckPaymentPage from './components/Dashboard/CheckPaymentPage';
import Mypage from './components/Mypage/Mypage';
import ResultPage from './components/Result/ResultPage';
import InvalidPage from './components/Result/InvalidPage';
import ForbiddenPage from './components/Result/ForbiddenPage';

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
            <Route path='/link' component={ResultPage}/>
            <Route path='/invalid' exact component={InvalidPage}/>
            <Route path='/forbidden' exact component={ForbiddenPage}/>
          </Switch>
        </Router>
        <FloatingButton/>
      </div>
    </div>
  );
}

export default App;
