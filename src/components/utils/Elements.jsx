import playlistsAPI from '@/apis/playLists.api';
import { useSpotifyContext } from '@/context/SpotifyContext';
import Lottie from 'lottie-react';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaCirclePause, FaCirclePlay } from 'react-icons/fa6';
import HeartAnimation from '../../assets/lotties/HeartAnimation.json';
import songsAPI from '@/apis/songs.api';

export const IconPlay = ({ playlist, size, playStyle, pauseStyle }) => {

    const { playList, setPlayList, isPlaying, setIsPlaying, setTrack, track } = useSpotifyContext();

    //handle select playlist
    const handleSelectPlaylist = async (e) => {
        //prevent default behavior
        e.stopPropagation();
        //if playlist is already playing, play it
        if (playList?._id === playlist?._id && track) {
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


export const HeartIcon = ({ song, size, style }) => {

    const [liked, setLiked] = useState(song?.liked);

    useEffect(() => {
        setLiked(song?.liked);
    }, [song]);

    //api call to like song
    const handleLikeSong = async (songId) => {
        const old = liked;
        setLiked(!old);
        try {
            const res = await songsAPI.likeSong(songId);
            if(res){
                setLiked(res.liked);
            } 
            else setLiked(old);
        } catch (error) {
            console.log('error liked');
            setLiked(old);
        }
    }
    
    return (
        <div className={`cursor-pointer items-center flex justify-center w-10 h-10 ${style}`} onClick={() => handleLikeSong(song?._id)}>
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
