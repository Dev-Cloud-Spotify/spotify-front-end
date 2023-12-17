import albumsAPI from '@/apis/albums.api';
import React, { useEffect, useState } from 'react';


const SideBarPlayLists = ({ inputSearch }) => {
    const [albums, setAlbums] = useState([]);
    const [filteredAlbums, setFilteredAlbums] = useState([]);

    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = () => {
        albumsAPI.getAlbums()
        .then((response) => {
            setAlbums(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    //handle Search
    useEffect(() => {
        if (inputSearch) {
            const filtered = albums.filter((album) => 
            album.title.toLowerCase().includes(inputSearch.toLowerCase()) 
            || album.artist?.name.toLowerCase().includes(inputSearch.toLowerCase()) 
            || album.artist?.lastName.toLowerCase().includes(inputSearch.toLowerCase()));
            setFilteredAlbums(filtered);
        } else {
            setFilteredAlbums(albums);
        }
    }, [inputSearch, albums]);

    return (
        <div className='h-[92%] overflow-auto'>
            {filteredAlbums.length === 0 && <div className='text-center h-full flex flex-col justify-center'>
                <span className='text-2xl font-semibold'>Unable de find "{inputSearch}"</span>
                <p className='text-gray'>Check spelling or use other keywords and try again</p>
            </div>}
            {filteredAlbums?.map((album)=> (
                <div key={album._id} className='items-center flex gap-2 rounded-md p-2 hover:bg-[#1a1a1a] cursor-pointer'>
                    <img src={album.coverImage}
                    className='w-12 h-12 object-cover rounded-md' alt="" />
                    <div className='flex flex-col'>
                       <span className='font-semibold line-clamp-1'>{album.title}</span> 
                       <span className='flex items-center gap-1 text-gray line-clamp-1'>{album.artist?.name} {album.artist?.lastName}</span> 
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SideBarPlayLists;
