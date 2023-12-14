import songsAPI from '@/apis/songs.api';
import { useSpotifyContext } from '@/context/SpotifyContext';
import React, { useEffect, useState } from 'react';

const WelcomePlaylists = () => {

    const { setTrack } = useSpotifyContext()
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetchSongs()
    }, [])

    const fetchSongs = () => {
        songsAPI.getSongs()
        .then((response) => {
            console.log(response)
            setSongs(response)
        })
        .catch((error)=> {
            console.log(error)
        })
    }
    
    return (
        <div className='p-6'>
           <span className='font-semibold'>Bonjour</span>  
            <div className='flex justify-center items-center gap-4'>
                {songs.map((song) => {
                    return (
                        <div className='flex flex-col justify-center items-center cursor-pointer hover:scale-105 transition-all' onClick={()=> setTrack(song)}>
                            <img src={song.coverImage} alt={song.title} className='w-[100px] h-[100px] rounded-full'/>
                            <span className='text-sm font-semibold'>{song.title}</span>
                        </div>
                    )
                })}

            </div>
        </div>
    );
}

export default WelcomePlaylists;
