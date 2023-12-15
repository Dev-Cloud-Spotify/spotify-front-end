import { useState, useEffect, useRef } from 'react';

import { FaCirclePlay } from 'react-icons/fa6';
import { IoPlaySkipForward, IoPlaySkipBackSharp } from 'react-icons/io5';
import { PiShuffleFill } from "react-icons/pi";
import { FaPauseCircle } from 'react-icons/fa';
import { SlLoop } from "react-icons/sl";

import PlayingSong from '../PlayingSong';
import AudioSettings from '../AudioSettings';

import { useSpotifyContext } from '@/context/SpotifyContext';
import playlistsAPI from '@/apis/playLists.api';


const MediaPlayer = () => {

  const { track, setTrack, tracks, setTracks, audioRef, setPlayList, isPlaying, setIsPlaying, playList} = useSpotifyContext();
  const [isHovered, setIsHovered] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const [selectedTrackCFurl, setSelectedTrackCFurl] = useState('');



  //handle track change 
  useEffect(() => {
    const audio = audioRef.current;

    if (!track.CFurl) return;

    // Pause the current track if it is playing
    if (isPlaying) {
      setIsPlaying(false);
      audio.pause();
    }

    // Set the new track
    setSelectedTrackCFurl(track.CFurl);
    audioRef.current.src = track.CFurl;

    // Load the new track
    audioRef.current.load();

    // If isPlaying was true, start playing the new track
    if (isPlaying) {
      setIsPlaying(true);
      audioRef.current.play();
    }

  }, [track.CFurl, playList]);


  //fetch songs from API
  useEffect(() => {
    const getsongsAPI = async () => {
      try {
        const myResponse = await playlistsAPI.getAllSongsPlaylist()
          setPlayList(myResponse)
          setIsPlaying(false);
          //set the first to be mounted right after the fetch is completed to avoid that fucking undefined error
          setSelectedTrackCFurl(myResponse.songs[0]?.CFurl);
          setTrack(myResponse.songs[0])
          setTracks(myResponse.songs)
      } catch (error) {
        console.error(error);
      }
    };
    getsongsAPI();
  }, []);

  //playlist change
  useEffect(() => {
    if(!tracks?.length > 0) return;
    if(isShuffling) randomTrack();
  }, [tracks]);


  // handle pause
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setCurrentAudioTime(0);
  };

  //handle next track
  const handleNext = () => {
    const currentIndex = tracks.findIndex(
      (track) => track.CFurl === selectedTrackCFurl
    );
    const nextIndex = (currentIndex + 1) % tracks.length;
    setSelectedTrackCFurl(tracks[nextIndex]?.CFurl);
    setTrack(tracks[nextIndex])

    audioRef.current.load();
    setIsPlaying(true)
  };

  //handlePrevious Track
  const handlePrevious = () => {
    //replay track at start if already started
    if(audioRef.current.currentTime >= 4) {
      audioRef.current.currentTime = 0
      return;
    }
    const currentIndex = tracks.findIndex(
      (track) => track.CFurl === selectedTrackCFurl
    );
    // Calculate the previous index, considering the possibility of negative values
    const previousIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setSelectedTrackCFurl(tracks[previousIndex]?.CFurl);
    setTrack(tracks[previousIndex])
    
    audioRef.current.load();
    setIsPlaying(true)

  };

  //handle audio time update
  useEffect(() => {
    //const audio = audioRef.current;
    const handleTimeUpdate = () => {
      setCurrentAudioTime(audioRef.current.currentTime);
    };
    const intervalId = setInterval(() => {
      handleTimeUpdate();
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  //handle start/pause with spacebar 
  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key === ' ') {
        handlePlayPause();
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      // Cleanup the event listener when the component unmounts
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handlePlayPause]);


  //handle audio play/pause and end of track
  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    if (isPlaying && currentAudioTime >= audio.duration) {
      setCurrentAudioTime(0);
      handleNext();
      // setIsPlaying(false);
    }

  }, [isPlaying, audioRef.current.currentTime]);

  //display time in minutes and seconds
  const formatTime = (timeInSeconds) => {
    if (!timeInSeconds) {
      return '0:00';
    }

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  //handle shuffle
  const randomTrack = () => {
    setTracks(tracks.sort(() => Math.random() - 0.5));
  };

  //handle shuffle
  useEffect(() => {
    if (isShuffling) {
      randomTrack();
    }
    else {
      setTracks(tracks.sort((a, b) => a.id - b.id));
    }
  }, [isShuffling]);


  //handle track bar gradient
  const calculateGradient = () => {
    const formattedTime = formatTime(audioRef.current.currentTime);
    const [minutes, seconds] = formattedTime.split(':');
    const timeInSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    const percentage = (timeInSeconds / audioRef.current.duration) * 100 || 0;

    return `linear-gradient(to right, ${isHovered ? '#1db954' : '#fff'} 0%, ${
      isHovered ? '#1db954' : '#fff'
    } ${percentage}%, #4d4d4d ${percentage}%, #4d4d4d 100%)`;
  };

  return (
    <div className='max-h-full flex items-center justify-between'>
      <div className='h-full w-1/3 flex justify-start pl-2'>
        <PlayingSong />
      </div>

    <div className="justify-center  flex flex-col gap-2 items-center">
      <div className="w-full flex justify-center items-center mt-2 gap-5">
        <PiShuffleFill size={20} onClick={()=>setIsShuffling(!isShuffling)} className={`cursor-pointer hover:scale-105 ${isShuffling && 'text-primary'}`} />
        <IoPlaySkipBackSharp className='cursor-pointer hover:scale-105' size={20} onClick={handlePrevious} />
        {isPlaying ? (
          <FaPauseCircle className='cursor-pointer hover:scale-105' size={32} onClick={handlePlayPause} />
        ) : (
          <FaCirclePlay className='cursor-pointer hover:scale-105' size={32} onClick={handlePlayPause} />
        )}
        <IoPlaySkipForward className='cursor-pointer hover:scale-105' size={20} onClick={handleNext} />
        <SlLoop className={`cursor-pointer hover:scale-105 ${isLooping && 'text-primary'}`} onClick={()=> setIsLooping(!isLooping)} />
      </div>

      <div className="flex justify-center gap-2 items-center">
        <span className="text-xs text[#a7a7a7]">{formatTime(audioRef.current.currentTime)}</span>
        <input
          type="range"
          value={audioRef.current.currentTime}
          min="0"
          max={audioRef.current.duration || 0}
          style={{
            background: calculateGradient(),
            overflow: isHovered ? 'visible' : 'hidden',
          }}
          onChange={(e) => {
            const newTime = parseFloat(e.target.value);
            setCurrentAudioTime(newTime);
            audioRef.current.currentTime = newTime;
          }}
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
          className="w-[620px] transition-all"
        />
        <span className="text-xs text[#a7a7a7]">{formatTime(audioRef.current.duration)}</span>
      </div>
    </div>

    <div className=' h-full w-1/3 flex justify-end pr-2'>
      <AudioSettings />
    </div>

    </div>

  );
};

export default MediaPlayer;
