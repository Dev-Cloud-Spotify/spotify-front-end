import { useSpotifyContext } from '@/context/SpotifyContext';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const PlayingSong = () => {

    const { track } = useSpotifyContext();
    const [liked, setLiked] = useState(false);
    
    
    return (
        <div className='flex items-center gap-4 justify-start'>
            {track?.title && (
                <>
            <img className='w-14 h-14 object-cover rounded-md' src={track?.coverImage} alt={track?.title} />
            <div className='flex flex-col'>
                <span className='text-sm font-semibold'>{track?.title}</span>
                <span className='text-xs text-[#a7a7a7]'>{track?.artist?.name} {track?.artist?.lastName}</span>
            </div>
            {
                liked ? <FaHeart size={18} className='text-primary cursor-pointer' onClick={() => setLiked(!liked)} /> 
                : <FaRegHeart size={18} className='text-gray-500 cursor-pointer' onClick={() => setLiked(!liked)} /> 
            }
            </>
           )}

        </div>
    );
}

export default PlayingSong;
