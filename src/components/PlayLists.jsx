import playlistsAPI from '@/apis/playLists.api';
import React, { useEffect, useState } from 'react';

const PlayLists = () => {

    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        fetchPlayLists();
    }, []);

    const fetchPlayLists = () => {
        playlistsAPI.getPlaylists()
        .then((response) => {
            setPlaylists(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }
        
    
    return (
        <div className='p-4'>
           <span className='text-2xl font-bold'>Concu pour Vous </span>
           <div className='pt-2 flex flex-wrap gap-4 justify-start'>
            {/* PlayLists  */}
            {playlists?.map((playlist, index) => (
                <div key={`${playlist._id}-${index}`} className='w-1/6 flex flex-col items-center'>
                    <img className='w-24 h-24 rounded-full' src={playlist.images[0].url} alt={playlist.name} />
                    <span className='text-xs text-center'>{playlist.name}</span>
                </div>
            ))}
           </div>
        </div>
    );
}

export default PlayLists;
