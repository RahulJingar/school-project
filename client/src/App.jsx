import React from 'react'
import UserSignup from './controller/UserSignup'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import UserLogin from './controller/UserLogin';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<UserSignup/>}/>
          <Route path="/" element={<UserLogin/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
