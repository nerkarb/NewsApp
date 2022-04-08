
import './App.css';

import React, { Component, useState } from 'react'
import Navbar from './component/Navbar';
import News  from './component/News';

import {  BrowserRouter as Router,  Routes,  Route,} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar' 

const App =()=>{
  const apikey = "fb011adae2f24349870510899aa351b7"

  const [progress,setProgress] = useState(0);
   


  
    return (
      <div>
         <Router>
      <Navbar />
      <LoadingBar
      height={3}
        color='#f11946'
        progress={progress}
      
      />
     
      <div className="container  my-3" >
        <Routes>
              <Route exact path="/" element={<News setProgress={setProgress}  apiKey =  {apikey}  key="general" category="general" /> }></Route>              
                <Route   exact path="/business" element={<News  setProgress={setProgress}  apiKey =  {apikey}   key="business" category="business"/>}></Route>
                <Route  exact path="/entertainment" element={<News  setProgress={setProgress}  apiKey =  {apikey}   key="entertainment" category="entertainment"/>}></Route>
                <Route  exact path="/health" element={<News  setProgress={setProgress}  apiKey =  {apikey}  key="health" category="health"/>}></Route>
                <Route  exact path="/science" element={<News  setProgress={setProgress}  apiKey =  {apikey}  key="science" category="science"/>}></Route>
                <Route exact path="/sports" element={<News  setProgress={setProgress}  apiKey =  {apikey}    key="sports" category="sports"/>}></Route>
                <Route  exact path="/technology" element={<News  setProgress={setProgress}  apiKey = {apikey}  key="technology" category="technology"/>}></Route>
           
                            
          </Routes>  
          </div>
      </Router> 




      </div>
    )
  
}
export default App
