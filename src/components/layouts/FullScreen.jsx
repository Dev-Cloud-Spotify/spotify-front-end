import { useSpotifyContext } from '@/context/SpotifyContext';
import React from 'react';
import MediaPlayer from './MediaPlayer';

const FullScreen = () => {

    const { track } = useSpotifyContext();
    return (
        <div className='fullscreen-image flex flex-col justify-between h-screen w-screen relative'>
            <img src={track?.coverImage} alt={track?.title} className='w-full h-full] object-cover' />
            <div className='h-[20%] absolute bottom-0 w-full'>
                <div className='flex justify-center align-bottom w-[92%] mx-auto'>
                    <MediaPlayer />
                </div>
            </div>
        </div>
    );
}

export default FullScreen;
