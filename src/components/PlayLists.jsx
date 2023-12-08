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
           <div>
            {/* PlayLists  */}
           </div>
        </div>
    );
}

export default PlayLists;
