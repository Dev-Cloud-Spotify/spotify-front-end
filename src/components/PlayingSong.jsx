import { useSpotifyContext } from '@/context/SpotifyContext';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { HeartIcon } from './utils/Elements';

const PlayingSong = () => {

    const { track } = useSpotifyContext();

    useEffect(() => {
        // console.log('trackkkk', track);
    }, [track]);

    return (
        <div className='flex items-center gap-4 justify-start max-w-full'>
            {track?.title && (
                <>
            <img className='w-14 h-14 object-cover rounded-md' src={track?.coverImage} alt={track?.title} />
            <div className='flex flex-col'>
            <span className='text-sm font-semibold max-w-[300px] overflow-hidden overflow-ellipsis line-clamp-2'>
            {track?.title}
            </span>
                <span className='text-xs text-[#a7a7a7]'>{track?.artist?.name} {track?.artist?.lastName}</span>
            </div>
            <HeartIcon song={track} size={20} style='text-primary' />
            </>
           )}

        </div>
    );
}

export default PlayingSong;
