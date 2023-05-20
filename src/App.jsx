import { useState } from 'react'
import './App.css'
import Player from './components/Player'
import Playlists from './components/Playlists'
import {HiOutlineBars3BottomRight} from 'react-icons/hi2'
import {AiFillCloseCircle} from 'react-icons/ai'
import { useGlobalContext } from './Context'
function App() {
  const {plays, toggleHamburger} = useGlobalContext();
  return (
    <div className="App">
      {plays ? <AiFillCloseCircle className='hamburger' onClick={toggleHamburger}/> :<HiOutlineBars3BottomRight className='hamburger' onClick={toggleHamburger}/>}
      <Player/>
      <Playlists/>
    </div>
  )
}

export default App
