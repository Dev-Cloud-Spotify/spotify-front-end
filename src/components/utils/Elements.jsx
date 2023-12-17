import playlistsAPI from '@/apis/playLists.api';
import { useSpotifyContext } from '@/context/SpotifyContext';
import Lottie from 'lottie-react';
import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaCirclePause, FaCirclePlay } from 'react-icons/fa6';
import HeartAnimation from '../../assets/lotties/HeartAnimation.json';

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
        if(playlist?.id){
            //else fetch playlist from API and play it
            playlistsAPI.getPlaylistById(playlist._id)
            .then(res => {
                setPlayList(res);
                setTrack(res.songs[0])
                setIsPlaying(true);
                return;
            })
            .catch(err => console.log(err));
        }
        else if(playlist?.songs?.length > 0){
            setPlayList(playlist);
            setTrack(playlist.songs[0])
            setIsPlaying(true);
            return;
        }
        
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


export const HeartIcon = ({  size, style }) => {

    const [liked, setLiked] = useState(false);

    const handleLiked = (e) => {
        e.stopPropagation();
        setLiked(!liked);
    }

    //api call to like song
    
    return (
        <div className={`cursor-pointer items-center flex justify-center w-10 h-10 ${style}`} onClick={handleLiked}>
        {liked ? (
          <Lottie
            animationData={HeartAnimation}
            loop={false}
            autoplay={true} // Autoplay when liked is true
            initialSegment={[10, 80]} // Only play first 30 frames when liked is false
          />
        ): (
          <FaRegHeart size={18} className={`text-white`} />
        )}
      </div>
    );
}
