// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import GetLongUrl from './components/GetLongUrl';
import GetShortUrl from './components/GetShortUrl';
import GetAllUrls from './components/GetAllUrls';
import Home from './components/Home';

import { Routes} from 'react-router'

function App() {
  const BASE_URL_SERVER = 'http://127.0.0.1:8000';

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/longUrl" element={<GetLongUrl baseUrl={BASE_URL_SERVER}/>} />
        <Route path="/shortUrl" element={<GetShortUrl baseUrl={BASE_URL_SERVER}/>} />
        <Route path="/allUrls" element={<GetAllUrls baseUrl={BASE_URL_SERVER}/>} />
      </Routes>
    </Router>
  );
}

export default App;