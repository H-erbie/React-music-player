import React, { useContext, useEffect, useRef, useState } from "react";
import { songs } from "./Data";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState(songs);
  const audio = useRef();
  const [play, setPlay] = useState(false);
  const [activeSong, setActiveSong] = useState(JSON.parse(localStorage.getItem('activeSong')) || {id: 1, progress: 0, length: 0});
  const onPlaying = () => {
    const duration = audio.current.duration;
    const ct = audio.current.currentTime;
    setActiveSong({...activeSong, progress: ct / duration * 100, length: duration})
  }
  const [plays, setPlays] = useState(false);
  const toggleHamburger = () => {
    setPlays(!plays)
  }
  useEffect(()=>{
    localStorage.setItem('activeSong', JSON.stringify(activeSong))
  })
  const playPause = () => {
        setPlay(!play)
};
  const changeActiveSong = (id) => {
    setPlay(false)
    setActiveSong({...activeSong,id: id})
    setPlay(true)
  }
  useEffect(()=>{
    changeActiveSong;
    toggleSongs;
    if(play){
            audio.current.play()
    }
    else{
      audio.current.pause()
    }
  },[play, activeSong])

  const toggleSongs = (op) => {
        if(op === 'nxt'){
          setPlay(true)
          setActiveSong({...activeSong, id: activeSong.id === playlist.length ? activeSong.id = 1 : activeSong.id + 1} )
        }
        if(op === 'prev'){
          setPlay(true)
          setActiveSong({...activeSong, id: activeSong.id === 1 ? activeSong.id = playlist.length  : activeSong.id - 1 })
        }
  }
  return (
    <AppContext.Provider value={{setPlays, plays, toggleHamburger, onPlaying, playlist, play, audio, toggleSongs, playPause, activeSong, changeActiveSong }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
