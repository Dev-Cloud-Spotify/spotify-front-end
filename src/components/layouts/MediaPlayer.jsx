import { FaPlay, FaPause, FaList } from 'react-icons/fa';
import { FaCirclePlay } from 'react-icons/fa6';
import { IoPlaySkipForward, IoPlaySkipBackSharp } from 'react-icons/io5';
import { FaRandom } from 'react-icons/fa';
import { TfiLoop } from 'react-icons/tfi';
import { FaPauseCircle } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

const MediaPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
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
    <div className="justify-center max-h-full flex flex-col gap-2 items-center">
      <div className="w-full flex justify-center items-center mt-2 gap-5">
        <FaRandom />
        <IoPlaySkipBackSharp size={20} />
        {isPlaying ? (
          <FaPauseCircle size={36} onClick={handlePlayPause} />
        ) : (
          <FaCirclePlay size={36} onClick={handlePlayPause} />
        )}
        <IoPlaySkipForward size={20} />
        <TfiLoop color="white" />
      </div>

      <div className="flex justify-center gap-2 items-center">
        <span className="text-sm">{formatTime(audioRef.current.currentTime)}</span>
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
          className="w-[680px] transition-all"
        />
        <span className="text-sm">{formatTime(audioRef.current.duration)}</span>
      </div>
    </div>
  );
};

export default MediaPlayer;
