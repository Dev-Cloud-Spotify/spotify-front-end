import React from 'react';
import { FaPlay, FaPause, FaList } from 'react-icons/fa';

const MediaPlayer = () => {
    return (
        <div className='w-full  bg-black flex justify-center items-center'>
            <audio controls>
                <source src="horse.ogg" type="audio/ogg" />
                <source src="horse.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            
        </div>
    );
}

export default MediaPlayer;
