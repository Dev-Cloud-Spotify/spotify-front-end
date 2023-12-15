'use client';
import playlistsAPI from '@/apis/playLists.api';
import PLaylistSongs from '@/components/PLaylistSongs';
import PlayLists from '@/components/PlayLists';
import PlaylistHeader from '@/components/PlaylistHeader';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {

    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        if(!id) return;
        fetchPlayList(id);
    }, [id]);

    const fetchPlayList = async (id) => {
        try{
            const response = await playlistsAPI.getPlaylistById(id);
            setPlaylist(response);
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className='w-full h-full p-6 rounded-md max-h-full overflow-auto bg-gradient-playlist'>
        <div className=' w-full h-[420px]'>
            <PlaylistHeader playlist={playlist}/>
        </div>
        <div className='h-full'>
            <PLaylistSongs songs={playlist?.songs} playlist={playlist} />
        </div>
    </div>
    );
}

export default Page;
