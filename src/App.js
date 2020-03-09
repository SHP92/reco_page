import React from 'react';
import { HashRouter, Route} from 'react-router-dom';
import Home from './routes/home';
import List from './routes/list';
import Detail from './routes/detail';


function App() {
  
  return (
    <HashRouter>
      <div>
        <Route path='/' exact={true} component={Home}></Route>
        <Route path='/:menu/:country/:lang' exact={true} component={List}></Route>
        <Route path='/:menu/:country/:lang/:id' exact={true} component={Detail}></Route>
      </div>
    </HashRouter>
  );
}

export default App;
