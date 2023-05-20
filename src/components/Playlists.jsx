import React from 'react'
import { useGlobalContext } from '../Context'

const Playlists = () => {
    const {playlist, activeSong, changeActiveSong, plays} = useGlobalContext();
  return (
    <div className={plays ? 'show-plays playlist-container' : 'playlist-container' }>
        <h2>Playlist</h2>
       <div className="songs">
       {
            playlist.map((item) => {
                const {id, name, artist} = item;
                return <article className={ activeSong.id === id ? 'song active-song' : 'song'} key={id} onClick={() => changeActiveSong(id)}>
                    <p className="song-name">{name}</p>
                    <span>-</span>
                    <p className="artist">{artist}</p>
                </article>
            })
        }
       </div>
    </div>
  )
}

export default Playlists