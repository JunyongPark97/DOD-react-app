import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Mainpage from './components/Mainpage/Mainpage';
import CreatePage from './components/CreateProject/CreatePage';
import ProjectLinkPage from './components/CreateProject/ProjectLinkPage'
import DashboardPage from './components/Dashboard/DashboardPage';
import Mypage from './components/Mypage/Mypage';
import ResultPage from './components/Result/ResultPage';
import InvalidPage from './components/Result/InvalidPage';
import ForbiddenPage from './components/Result/ForbiddenPage';
import Board from './components/Board/Board';
import Post from './components/Board/Post';
import CreatePost from './components/Board/CreatePost';
import CheckLinkForPost from './components/Board/CheckLinkForPost';
import UpdatePost from './components/Board/UpdatePost';
import TestResultPage from './components/Result/TestResultPage';
import ThanksPage from './components/common/ThanksPage';

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
            <Route path='/mypage' exact component={Mypage}/>
            <Route path='/link' component={ResultPage}/>
            <Route path='/invalid' exact component={InvalidPage}/>
            <Route path='/forbidden' exact component={ForbiddenPage}/>
            <Route path='/board' exact component={Board}/>
            <Route path='/post/create' exact component={CheckLinkForPost}/>
            <Route path='/post/create/content' exact component={CreatePost}/>
            <Route path='/post/create/update' exact component={UpdatePost}/>
            <Route path='/post' exact component={Post}/>
            <Route path='/testlink' exact component={TestResultPage}/>
            <Route path='/thankyou' exact component={ThanksPage}/>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
