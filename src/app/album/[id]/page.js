'use client';
import albumsAPI from '@/apis/albums.api';
import PLaylistSongs from '@/components/PLaylistSongs';
import PlaylistHeader from '@/components/PlaylistHeader';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {

    const { id } = useParams();
    const [album, setAlbum] = useState({});
    const [playlist, setPlaylist] = useState({});

    useEffect(() => {
        if(!id) return;
        fetchAlbum(id);
    }, [id]);

    useEffect(() => {
        const data = {
            _id: album?._id,
            title: album?.title,
            coverImage: album?.coverImage,
            songs: album?.songs,
        }
        setPlaylist(data);

    }, [album]);

    const fetchAlbum = async (id) => {
        try{
            const response = await albumsAPI.getAlbumbyId(id);
            console.log(response)
            setAlbum(response);
        }
        catch(err){
            console.log(err);
        }
    }

    return (
    <div className='w-full h-full p-6 rounded-md max-h-full overflow-auto bg-gradient-artist'>
        <div className='w-full h-[500px]'>
            <PlaylistHeader playlist={playlist}/>
        </div>
        <div className='h-full'>
            <PLaylistSongs songs={album?.songs} playlist={playlist} />
        </div>
    </div>
    );
}

export default Page;
