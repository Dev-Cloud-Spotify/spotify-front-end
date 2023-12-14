import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const PlayingSong = () => {

    const [liked, setLiked] = useState(false);
    const song = {
        title: "On trace la route",
        artist: "Christophe Maé",
        album: "On trace la route",
        duration: "3:27",
        coverImage: "https://img.grooves.land/images/cover/016/792/s0kkr00g.j31",
        audio: "https://d2ykmt6l7yk0wq.cloudfront.net/On trace la route.m4a"
    }
    return (
        <div className='flex items-center gap-4 justify-start'>
            <img className='w-14 h-14 object-cover rounded-md' src={song.coverImage} alt={song.title} />
            <div className='flex flex-col'>
                <span className='text-sm font-semibold'>{song.title}</span>
                <span className='text-xs text-[#a7a7a7]'>{song.artist}</span>
            </div>
            {
                liked ? <FaHeart size={18} className='text-primary cursor-pointer' onClick={() => setLiked(!liked)} /> 
                : <FaRegHeart size={18} className='text-gray-500 cursor-pointer' onClick={() => setLiked(!liked)} /> 
            }
           
        </div>
    );
}

export default PlayingSong;
