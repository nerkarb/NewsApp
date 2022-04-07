
import './App.css';

import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News  from './component/News';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar' 

export default class App extends Component {
   
  state = {
    progress :0
  }
 setProgress = (progress) =>{
     this.setState({progress:progress})
 }
  render() {
    return (
      <div>
         <Router>
      <Navbar />
      <LoadingBar
      height={3}
        color='#f11946'
        progress={this.state.progress}
      
      />
     
      <div className="container  my-3" >
        <Routes>
              <Route exact path="/" element={<News setProgress={this.setProgress} key="general" category="general" /> }></Route>              
                <Route   exact path="/business" element={<News  setProgress={this.setProgress}key="business" category="business"/>}></Route>
                <Route  exact path="/entertainment" element={<News  setProgress={this.setProgress}key="entertainment" category="entertainment"/>}></Route>
                <Route  exact path="/health" element={<News  setProgress={this.setProgress}key="health" category="health"/>}></Route>
                <Route  exact path="/science" element={<News  setProgress={this.setProgress}key="science" category="science"/>}></Route>
                <Route exact path="/sports" element={<News  setProgress={this.setProgress} key="sports" category="sports"/>}></Route>
                <Route  exact path="/technology" element={<News  setProgress={this.setProgress}key="technology" category="technology"/>}></Route>
           
                            
          </Routes>  
          </div>
      </Router> 



{/* 
        <Navbar />
        <News  setProgress={this.setProgress}pageSize={5} country="in" category="science"/> */}
      </div>
    )
  }
}
