import { useSpotifyContext } from '@/context/SpotifyContext';
import React from 'react';
import { FaCirclePause, FaCirclePlay } from 'react-icons/fa6';

export const IconPlay = ({ playlist, size, playStyle, pauseStyle }) => {

    const { playList, setPlayList, isPlaying, setIsPlaying } = useSpotifyContext();

    //handle select playlist
    const handleSelectPlaylist = async (e) => {
        //prevent default behavior
        e.stopPropagation();
        setPlayList(playlist);
        setIsPlaying(true);
    }

    //handle pause audio
    const handlePauseAudio = (e) => {
        //prevent default behavior
        e.stopPropagation();
        setIsPlaying(false);
    }
    
    return (
        <>
            {isPlaying && playList?._id === playlist?._id ? (
                <FaCirclePause size={size} className={`text-primary bg-black rounded-full cursor-pointer opacity-95 transition-all hover:scale-105 ${pauseStyle}`} onClick={(e) => handlePauseAudio(e)} />
            ) : (
                <FaCirclePlay size={size} className={`text-primary bg-black rounded-full cursor-pointer transition-all hover:scale-105 ${playStyle}`} onClick={(e) => handleSelectPlaylist(e)} />
            )}
        </>
    );
}
