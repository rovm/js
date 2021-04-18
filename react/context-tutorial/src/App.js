import React from 'react';
import ColorBox from './components/ColorBox';
import {ColorProvider} from './contexts/color';

function App() {
  return (
    <ColorProvider>
        <div>
            <ColorBox></ColorBox>
        </div>
    </ColorProvider>
  );
}

export default App;
