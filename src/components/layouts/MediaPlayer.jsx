import { useState, useEffect, useRef } from 'react';

import { FaCirclePlay } from 'react-icons/fa6';
import { IoPlaySkipForward, IoPlaySkipBackSharp } from 'react-icons/io5';
import { PiShuffleFill } from "react-icons/pi";
import { FaPauseCircle } from 'react-icons/fa';
import { SlLoop } from "react-icons/sl";

import PlayingSong from '../PlayingSong';
import AudioSettings from '../AudioSettings';

import { useSpotifyContext } from '@/context/SpotifyContext';
import songsAPI from '@/apis/songs.api';

import { useSocketContext } from '@/context/SocketContext';

const MediaPlayer = () => {

  const { current: socketRef } = useSocketContext();
  const { track, setTrack, tracks, setTracks, audioRef, isPlaying, setIsPlaying, playList} = useSpotifyContext();

  const [isHovered, setIsHovered] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const [selectedTrackCFurl, setSelectedTrackCFurl] = useState('');
  const [songIsListenning, setSongIsListenning] = useState(false);


  

  useEffect(() => {
    if (socketRef && track) {
      socketRef.emit('changeTrack', { track });
    }
  }, [socketRef, track.CFurl]);

  useEffect(() => {
    console.log('Listening for testEvent');
  
    // Listen for the "testEvent" event from the server
    console.log('socketRef', socketRef);
    if (!socketRef) return;
    socketRef.on('changeTrack', (data) => {
      console.log('Received changeTrack:', data);
  
      setTrack(data.track);
    });
  
    return () => {
      // Clean up event listener on component unmount
      socketRef.off('changeTrack');
    };
  }, [socketRef]);


  //handle track change 
  useEffect(() => {
    const audio = audioRef.current;
    setSongIsListenning(false)

    if (!track?.CFurl) return;

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

  }, [track?.CFurl, playList]);


  //playlist change
  useEffect(() => {
    if(!tracks?.length > 0) return;
    if(isShuffling) randomTrack();
  }, [tracks]);


  // handle pause
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  //handle next track
  const handleNext = () => {
    setSongIsListenning(false)
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
    setSongIsListenning(false)
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
      //toggle the play/pause if the spacebar is pressed and the target is not an input
      if (e.key === ' ' && e.target.tagName !== 'INPUT') {
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
      document.title = track?.title;
    } else {
      audioRef.current.pause();
    }

    if (isPlaying && audioRef.current.currentTime >= audio.duration-1) {
      console.log('end of track')
      // setCurrentAudioTime(0);
      if (isLooping) {
        console.log('looping')
        console.log('currentAudioTime', currentAudioTime)
        handlePrevious();
      }
      else {
        console.log('not looping')
        handleNext();
      } 
    }

    //when audio is listenning for at least 10s, update the listenning count
    if(isPlaying && currentAudioTime >= 10 && !songIsListenning) {
      console.log('incrementing listens')
      setSongIsListenning(true)
      songsAPI.incrementListens(track._id)
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
    <div className='max-h-full w-full flex items-center justify-between'>
      {/* PlayingSong  */}
      <div className='h-full flex w-1/3 justify-start pl-2'>
        <PlayingSong />
      </div>

    {/* Media Player */}
    <div className="flex flex-col gap-2 items-center">
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
          max={audioRef.current.duration || track?.duration}
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
        <span className="text-xs text[#a7a7a7]">{formatTime(audioRef.current.duration || track?.duration) }</span>
      </div>
    </div>

    {/* Audio Settings */}
    <div className='h-full w-1/3 flex justify-end pr-2'>
      <AudioSettings />
    </div>

    </div>

  );
};

export default MediaPlayer;
