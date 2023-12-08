import albumsAPI from '@/apis/albums.api';
import React, { useEffect, useState } from 'react';


const SideBarPlayLists = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = () => {
        albumsAPI.getAlbums()
        .then((response) => {
            console.log(response)
            setAlbums(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    return (
        <div className='h-[92%] overflow-auto'>
            {albums?.map((album)=> (
                <div key={album._id} className='items-center flex gap-2 rounded-md p-2 hover:bg-[#1a1a1a]'>
                    <img src={album.coverImage}
                    className='w-12 h-12 object-cover rounded-md' alt="" />
                    <div className='flex flex-col'>
                       <span className='font-semibold'>{album.title}</span> 
                       <span className='flex items-center gap-1 text-gray'>{album.artist?.name} {album.artist?.lastName}</span> 
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SideBarPlayLists;
