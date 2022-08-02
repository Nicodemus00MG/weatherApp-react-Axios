import { useState,useEffect } from 'react'

import './App.css'
import Card from './components/Card.jsx'
function App() {


const [coords, setcoords] = useState()
 



useEffect(()=>{

  const success=(pos)=>{
    
    const info={
      latitude:pos.coords.latitude,
      longitude:pos.coords.longitude
    }

    setcoords(info)
  }

 

  navigator.geolocation.getCurrentPosition(success)
  

},[])


  return (
    <div className="App">
    <Card lat={coords?.latitude} lon={coords?.longitude}/>
    
    </div>
  )
}

export default App
