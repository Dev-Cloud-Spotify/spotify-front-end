import artistsAPI from '@/apis/artists.api';
import React, { useEffect, useState } from 'react';

const SideBarArtists = ({ inputSearch }) => {
    const [artists, setArtists] = useState([]);
    const [filteredArtists, setFilteredArtists] = useState([]);

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

    //handle Search
    useEffect(() => {
        if (inputSearch) {
            const filtered = artists.filter((artist) => artist.name.toLowerCase().includes(inputSearch.toLowerCase()) || artist.lastName.toLowerCase().includes(inputSearch.toLowerCase()));
            setFilteredArtists(filtered);
        } else {
            setFilteredArtists(artists);
        }
    }, [inputSearch, artists]);

    return (
        <div className='h-[92%] overflow-auto'>
            {filteredArtists.length === 0 && <div className='text-center h-full flex flex-col justify-center'>
                <span className='text-2xl font-semibold'>Unable de find "{inputSearch}"</span>
                <p className='text-gray'>Check spelling or use other keywords and try again</p>
            </div>}
            {filteredArtists?.map((artist)=> (
                <div key={artist._id} className='items-center flex gap-2 rounded-md p-2 hover:bg-[#1a1a1a] cursor-pointer'>
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
