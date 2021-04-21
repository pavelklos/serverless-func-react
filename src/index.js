import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Product from './Product';
import Photo from './Photo';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path='/' exact>
        <App />
      </Route>
      {/* <Route path='/:productID' component={Product} /> */}
      <Route path='/product/:productID' component={Product} />
      {/* <Route path='/:photoID' component={Photo} /> */}
      <Route path='/photo-pakistan-2021/:photoID' component={Photo} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
