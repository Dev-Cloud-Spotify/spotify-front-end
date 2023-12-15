import playlistsAPI from '@/apis/playLists.api';
import { useSpotifyContext } from '@/context/SpotifyContext';
import React from 'react';
import { FaCirclePause, FaCirclePlay } from 'react-icons/fa6';

export const IconPlay = ({ playlist, size, playStyle, pauseStyle }) => {

    const { playList, setPlayList, isPlaying, setIsPlaying, setTrack } = useSpotifyContext();

    //handle select playlist
    const handleSelectPlaylist = async (e) => {
        console.log('playlistID', playlist._id)
        console.log('playList', playList._id)
        //prevent default behavior
        e.stopPropagation();
        //if playlist is already playing, play it
        if (playList?._id === playlist?._id) {
            setIsPlaying(true);
            return;
        }
        //else fetch playlist from API and play it
        playlistsAPI.getPlaylistById(playlist._id)
        .then(res => {
            setPlayList(res);
            setTrack(res.songs[0])
            setIsPlaying(true);
        })
        .catch(err => console.log(err));
        
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
