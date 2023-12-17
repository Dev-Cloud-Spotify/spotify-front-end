'use client';
import artistsAPI from '@/apis/artists.api';
import ArtistHeader from '@/components/ArtistHeader';
import PLaylistSongs from '@/components/PLaylistSongs';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {

    const { id } = useParams();
    const [artist, setArtist] = useState({});
    const [playlist, setPlaylist] = useState({});

    useEffect(() => {
        if(!id) return;
        fetchArtist(id);
    }, [id]);

    useEffect(() => {
        const data = {
            _id: artist?._id,
            title: artist?.name,
            songs: artist?.songs,
        }
        setPlaylist(data);

    }, [artist]);

    const fetchArtist = async (id) => {
        try{
            const response = await artistsAPI.getArtistbyId(id);
            setArtist(response);
        }
        catch(err){
            console.log(err);
        }
    }

    return (
    <div className='w-full h-full rounded-md max-h-full overflow-auto bg-gradient-artist'>
        <div className='w-full h-[500px]'>
            <ArtistHeader artist={artist}/>
        </div>
        <div className='h-full'>
            <PLaylistSongs songs={artist?.songs} playlist={playlist} />
        </div>
    </div>
    );
}

export default Page;
