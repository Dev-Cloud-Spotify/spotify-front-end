import { FaPlay, FaPause, FaList } from 'react-icons/fa';
import { FaCirclePlay } from 'react-icons/fa6';
import { IoPlaySkipForward } from 'react-icons/io5';
import { IoPlaySkipBackSharp } from 'react-icons/io5';
import { FaRandom } from 'react-icons/fa';
import { TfiLoop } from 'react-icons/tfi';
import { FaPauseCircle } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

const MediaPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const audioRef = useRef(
    new Audio('https://d2ykmt6l7yk0wq.cloudfront.net/10secondsTEST.m4a')
  );

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentAudioTime(audio.currentTime);
    };

    // Set up event listeners
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

    // Clean up event listeners when the component unmounts
    return () => {
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying) {
      audioRef.current.play();
      console.log(audioRef.current.currentTime, 'currentAudioTime');
    } else {
      audioRef.current.pause();
    }

    if (isPlaying && currentAudioTime >= audio.duration) {
      setCurrentAudioTime(0); // Reset time to beginning
      setIsPlaying(false); // Pause when the end is reached
    }

    console.log('audio arreté à la seconde: ', audio.currentTime);
    console.log('l audio dure: ', audio.duration);
    setCurrentAudioTime(audio.currentTime);

    // No need to pause here, as it's handled above
  }, [isPlaying, currentAudioTime]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="bg-blue-800 justify-center max-h-full flex flex-col items-center">
      <div className="w-full flex justify-center items-center space-x-4">
        <FaRandom />
        <IoPlaySkipBackSharp size={20} />
        {isPlaying ? (
          <FaPauseCircle size={40} onClick={handlePlayPause} />
        ) : (
          <FaCirclePlay size={40} onClick={handlePlayPause} />
        )}
        <IoPlaySkipForward size={20} />
        <TfiLoop color="green" />
      </div>
      <div className="flex justify-between w-full">
        <div>
          <h2>{formatTime(audioRef.current.currentTime)}</h2>
        </div>
        <div>
          <h2>{formatTime(audioRef.current.duration)}</h2>
        </div>

      </div>
      <input
        type="range"
        value={audioRef.current.currentTime}
        min="0"
        max={audioRef.current.duration}
        step="1"
        onChange={(e) => {
          const newTime = parseFloat(e.target.value);
          setCurrentAudioTime(newTime);
          audioRef.current.currentTime = newTime;
        }}
        className="w-full"
      />
    </div>
  );
};

export default MediaPlayer;
