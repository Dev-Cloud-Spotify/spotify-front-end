'use client';
import playlistsAPI from '@/apis/playLists.api';
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
        <div className='w-full h-full p-6 rounded-md bg-gradient-to-b from-[#222a59] to-[#10121c] max-h-full overflow-auto'>
        <div className=' w-full h-[420px]'>
            <PlaylistHeader playlist={playlist}/>
        </div>
        <div className='h-full'>
            <PlayLists />
        </div>
    </div>
    );
}

export default Page;
