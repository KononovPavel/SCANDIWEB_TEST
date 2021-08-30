import React from 'react';
import Header from "./component/header/Header";
import './App.css'
import Router from "./router/router";


function App() {

  return (
    <div className=''>
         <div className="app-wrapper">
             <Header />
             <Router />
         </div>

    </div>
  );
}

export default App;
