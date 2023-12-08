import artistsAPI from '@/apis/artists.api';
import playlistsAPI from '@/apis/playLists.api';
import React, { useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';

const SideBarArtists = () => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        fetchArtists();
    }, []);

    const fetchArtists = () => {
        artistsAPI.getArtists()
        .then((response) => {
            console.log(response)
            setArtists(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    return (
        <div className='h-[92%] overflow-auto'>
            {artists?.map((artist)=> (
                <div key={artist._id} className='items-center flex gap-2 rounded-md p-2 hover:bg-[#1a1a1a]'>
                    <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/spotify-style-illustration-album-art-2020-design-template-ff72ffd1b198e4a94ee8c58cceb1da19_screen.jpg?ts=1600257159" 
                    className='w-12 h-12 object-cover rounded-full' alt="" />
                    <div className='flex flex-col'>
                       <span className='first-letter:uppercase font-bold'>{artist.name} {artist.lastName} </span> 
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SideBarArtists;
