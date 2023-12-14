import { useState, useEffect, useRef } from 'react';

import { FaCirclePlay } from 'react-icons/fa6';
import { IoPlaySkipForward, IoPlaySkipBackSharp } from 'react-icons/io5';
import { PiShuffleFill } from "react-icons/pi";
import { FaPauseCircle } from 'react-icons/fa';
import { SlLoop } from "react-icons/sl";

import PlayingSong from '../PlayingSong';
import AudioSettings from '../AudioSettings';

import songsAPI from '@/apis/songs.api';
import { useSpotifyContext } from '@/context/SpotifyContext';


const MediaPlayer = () => {

  const { track, volume, tracks, setTracks, audioRef} = useSpotifyContext();
// const [tracks, setTracks] = useState([]);
const [isHovered, setIsHovered] = useState(false);
const [isShuffling, setIsShuffling] = useState(false);
const [isLooping, setIsLooping] = useState(false);
const [isPlaying, setIsPlaying] = useState(false); 
const [currentAudioTime, setCurrentAudioTime] = useState(0);
const [selectedTrackCFurl, setSelectedTrackCFurl] = useState(
  tracks[0]?.CFurl
);
const [selectedTrackTitle, setSelectedTrackTitle] = useState(
  tracks[0]?.title
);


useEffect(() => {
  console.log('track.CFurl', track.CFurl)
  const audio = audioRef.current;

  // Pause the current track
  setIsPlaying(false);
  if (audio){
    audio.pause();
  }
  
  // Set the new track
  setSelectedTrackCFurl(track.CFurl);
  setSelectedTrackTitle(track.title);
  audioRef.current.src = track.CFurl;
  audioRef.current.load();
  
  // Play the new track if it was playing before
  // if (isPlaying) {
  //   audioRef.current.play();
  //   setIsPlaying(true);
  // }
  setIsPlaying(true);

}, [track.CFurl]);

useEffect(() => {
  audioRef.current.src = selectedTrackCFurl || '';
  console.log('audioRef.current', audioRef.current);
}, [selectedTrackCFurl]);

useEffect(() => {
  const getsongsAPI = async () => {
    try {
      const myResponse = await songsAPI.getSongs().then((response) => {
        return response;
      });
      setTracks(myResponse);
      //set the first to be mounted right after the fetch is completed to avoid that fucking undefined error
      setSelectedTrackCFurl(myResponse[0]?.CFurl);
    } catch (error) {
      console.error(error);
    }
  };
  getsongsAPI();
}, []);


const handlePlayPause = () => {
  setIsPlaying(!isPlaying);
  setCurrentAudioTime(0);
};

const handleNext = () => {
  const currentIndex = tracks.findIndex(
    (track) => track.CFurl === selectedTrackCFurl
  );
  const nextIndex = (currentIndex + 1) % tracks.length;
  setSelectedTrackCFurl(tracks[nextIndex]?.CFurl);
  setSelectedTrackTitle(tracks[nextIndex]?.title);
  

  audioRef.current.pause();
};

useEffect(() => {
  console.log('selectedTrackCFurl', track);
}, [track]);

const handlePrevious = () => {
  const currentIndex = tracks.findIndex(
    (track) => track.CFurl === selectedTrackCFurl
  );
  // Calculate the previous index, considering the possibility of negative values
  const previousIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  setSelectedTrackCFurl(tracks[previousIndex]?.CFurl);
  setSelectedTrackTitle(tracks[previousIndex]?.title);
  audioRef.current.pause();
};

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

useEffect(() => {
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handlePlayPause();
    }
  };

  document.addEventListener('keyup', handleKeyUp);

  return () => {
    // Cleanup the event listener when the component unmounts
    document.removeEventListener('keyup', handleKeyUp);
  };
}, [handlePlayPause]);

//console.log('la state tracks', tracks[0]?.title);

useEffect(() => {
  const audio = audioRef.current;

  if (isPlaying) {
    audioRef.current.play();
    //console.log(audioRef.current.currentTime, 'currentAudioTime');
  } else {
    audioRef.current.pause();
  }

  if (isPlaying && currentAudioTime >= audio.duration) {
    setCurrentAudioTime(0);
    setIsPlaying(false);
  }

}, [isPlaying, audioRef.current.currentTime]);

const formatTime = (timeInSeconds) => {
  if (!timeInSeconds) {
    return '0:00';
  }

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

const randomTrack = () => {
  const randomIndex = Math.floor(Math.random() * tracks.length);
  setSelectedTrackCFurl(tracks[randomIndex]?.CFurl);
  setSelectedTrackTitle(tracks[randomIndex]?.title);
  audioRef.current.pause();
};



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
          max={audioRef.current.duration}
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
