import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './css/App.css'
import Accordion from './components/Accordion'
import fakedata from "./fakedata.json"

function App() {

  const [expandedIndex, setExpandedIndex] = useState(-1);

  const data = fakedata;

  return (
    <>
    <Accordion expandedIndex={expandedIndex} data={data}/>
     
    </>
  )
}

export default App
