import React, { useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import {GiNextButton, GiPreviousButton} from 'react-icons/gi'
import { useGlobalContext } from "../Context";

const Player = () => {
  const {
    play,
    playPause,
    activeSong,
    playlist,
    audio,
    toggleSongs,
    setPlays,
    onPlaying,
  } = useGlobalContext();
  const clickRef = useRef();
  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divProgress = (offset / width) * 100;
    audio.current.currentTime = (divProgress / 100) * activeSong.length;
  };
  let initalLeft = Math.floor(
    Math.floor((activeSong.progress / 100) * activeSong.length) / 60
  );
  let initialRight = Math.floor(
    ((activeSong.progress / 100) * activeSong.length) % 60
  );
  let fullLeft = Math.floor(activeSong.length / 60);
  let fullRight = Math.floor(activeSong.length % 60);
  return (
    <div className="player-container" onClick={() => setPlays(false)}>
      {playlist.map((item) => {
        if (item.id === activeSong.id) {
          return (
            <>
              <div className="song-thumbnail">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="song-info">
                <p className="name">{item.name}</p>
                <span>-</span>
                <p className="artist">{item.artist}</p>
              </div>
              <div className="controls">
                <button
                  className="btn player-control"
                  onClick={() => toggleSongs("prev")}
                >
                  <GiPreviousButton />
                </button>
                <button className="btn player-control" onClick={playPause}>
                  {play ? <FaPause /> : <FaPlay />}
                </button>
                <button
                  className="btn player-control"
                  onClick={() => toggleSongs("nxt")}
                >
                  <GiNextButton />
                </button>
              </div>
              <div className="song-length-info">
                <span>
                  {initalLeft < 10 ? `0${initalLeft}` : initalLeft} :{" "}
                  {initialRight < 10 ? `0${initialRight}` : initialRight}
                </span>
                <span>
                  {fullLeft < 10 ? `0${fullLeft}` : fullLeft} :{" "}
                  {fullRight < 10 ? `0${fullRight}` : fullRight}
                </span>
              </div>
              <div className="song-length" ref={clickRef} onClick={checkWidth}>
                <audio src={item.song} ref={audio} onTimeUpdate={onPlaying} />
                <div
                  className="seek-bar"
                  style={{ width: `${activeSong.progress}%` }}
                ></div>
              </div>
            </>
          );
        }
      })}
    </div>
  );
};

export default Player;
