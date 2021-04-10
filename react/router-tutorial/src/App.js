import React from 'react';
import {Route, Link} from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profiles from './Profiles';
import HistorySample from './HistorySample';

const App = () => {
  return(
    <div>
      <ul>
        <li>
          <Link to='/'>홈</Link>
        </li>
        <li>
          <Link to='/about'>소개</Link>
        </li>
        <li>
          <Link to='/Profiles'>프로필</Link>
        </li>
        <li>
          <Link to='/history'>히스토리 예제</Link>
        </li>
      </ul>
      <hr/>
      <Route path='/' component={Home} exact={true}/>
      <Route path={['/About', '/info']} component={About}/>
      <Route path={'/Profiles'} component={Profiles}/>
      <Route path={'/history'} component={HistorySample}/>
    </div>
  );
}
export default App;
