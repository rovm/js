import React, {useState, Suspense} from 'react';
import logo from './logo.svg';
import './App.css';
// import SplitMe from './SplitMe';
import loadable from '@loadable/component';
const SplitMe = loadable(() => import('./SplitMe'), {
  fallback: <div>loading...</div>
});

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };

  const onMouseOver = () => {
    SplitMe.preload();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt='log'></img>
        <p onClick={onClick} onMouseOver={onMouseOver}>
          Hello React!
        </p>
        {/* <Suspense fallback={<div>loading...</div>}>
          {visible && <SplitMe/>}
        </Suspense> */}
        {visible && <SplitMe/>}
      </header>
    </div>
  )
}

export default App;
