import { useState } from 'react'
import './App.css'
import LandingPage from "./pages/landpage";

import { Route, Routes } from "react-router";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div>
        <Routes>
         <Route path = "/" element = {<LandingPage/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App



