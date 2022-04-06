
import './App.css';

import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


export default class App extends Component {
   

  render() {
    return (
      <div>
         <Router>
      <Navbar />
     
      <div className="container  my-3" >
        <Routes>
              <Route exact path="/" element={<News /> }></Route>              
                <Route exact path="/business" element={<News  category="business"/>}></Route>
                <Route exact path="/entertainment" element={<News category="entertainment"/>}></Route>
                <Route exact path="/general" element={<News category="general" />}></Route> 
                <Route exact path="/health" element={<News category="health"/>}></Route>
                <Route exact path="/science" element={<News category="science"/>}></Route>
                <Route exact path="/sports" element={<News category="sports"/>}></Route>
                <Route exact path="/technology" element={<News category="technology"/>}></Route>
           
                            
          </Routes>  
          </div>
      </Router> 



{/* 
        <Navbar />
        <News pageSize={5} country="in" category="science"/> */}
      </div>
    )
  }
}
