import { useState, useEffect, useRef } from 'react';

import { FaCirclePlay } from 'react-icons/fa6';
import { IoPlaySkipForward, IoPlaySkipBackSharp } from 'react-icons/io5';
import { PiShuffleFill } from "react-icons/pi";
import { FaPauseCircle } from 'react-icons/fa';
import { SlLoop } from "react-icons/sl";
import PlayingSong from '../PlayingSong';
import AudioSettings from '../AudioSettings';

const MediaPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const audio = new Audio('https://d2ykmt6l7yk0wq.cloudfront.net/On trace la route.m4a');
  const audioRef = useRef(audio);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentAudioTime(audio.currentTime);
    };

    const intervalId = setInterval(() => {
      handleTimeUpdate();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying) {
      audioRef.current.play();
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
        <IoPlaySkipBackSharp className='cursor-pointer hover:scale-105' size={20} onClick={()=> (console.log('click'))} />
        {isPlaying ? (
          <FaPauseCircle className='cursor-pointer hover:scale-105' size={32} onClick={handlePlayPause} />
        ) : (
          <FaCirclePlay className='cursor-pointer hover:scale-105' size={32} onClick={handlePlayPause} />
        )}
        <IoPlaySkipForward className='cursor-pointer hover:scale-105' size={20} onClick={()=> (console.log('click'))} />
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
