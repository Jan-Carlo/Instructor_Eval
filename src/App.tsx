import { useState } from 'react'
import './App.css'
import LandingPage from "./assets/Pages/landpage";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <LandingPage />
    </div>
  )
}

export default App



