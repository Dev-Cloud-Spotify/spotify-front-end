import playlistsAPI from '@/apis/playLists.api';
import React, { useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';

const SideBarPlayLists = () => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        fetchPlayLists();
    }, []);

    const fetchPlayLists = () => {
        playlistsAPI.getPlaylists()
        .then((response) => {
            console.log(response)
            setPlaylists(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    return (
        <div className='h-[92%] overflow-auto'>
            {playlists?.map((playlist)=> (
                <div key={playlist._id} className='items-center flex gap-2 rounded-md p-2 hover:bg-[#1a1a1a]'>
                    <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/spotify-style-illustration-album-art-2020-design-template-ff72ffd1b198e4a94ee8c58cceb1da19_screen.jpg?ts=1600257159" 
                    className='w-12 h-12 object-cover rounded-md' alt="" />
                    <div className='flex flex-col'>
                       <span>{playlist.title}</span> 
                       <span className='flex items-center gap-1 text-gray'> playlist <FaCircle size={10}/> {playlist.title}</span> 
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SideBarPlayLists;
