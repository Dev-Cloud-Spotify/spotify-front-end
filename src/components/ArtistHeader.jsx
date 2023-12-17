import React from 'react';
import { IconPlay } from './utils/Elements';
import { RxDotsHorizontal } from 'react-icons/rx';

const ArtistHeader = ({ artist }) => {

    const playlist = {
        _id: artist?._id,
        title: artist?.name,
        songs: artist?.songs,
    }
    
    return (
        <div className='flex flex-col h-full w-full'>
                <div className='w-full h-[80%] relative'>
                    <img 
                        src={artist?.artistImage || 'https://www.mendix.com/wp-content/uploads/Blog-Banner-10-2-23-Spotify-Pt-2.png' } 
                        className='w-full h-full object-cover' alt={artist?.name} 
                        style={{ boxSizing: 'content-box' }}
                    />
                    <div className='absolute bottom-10 left-8 text-8xl font-bold'> {artist?.name} {artist?.lastName} </div>
                </div>

               
                 <div className='flex gap-8 items-center p-6'>
                     <IconPlay size={54} playlist={playlist} />
                     <RxDotsHorizontal size={32} className='text-[#fcfcfc] cursor-pointer' />
                 </div>
            </div>

    );
}

export default ArtistHeader;
