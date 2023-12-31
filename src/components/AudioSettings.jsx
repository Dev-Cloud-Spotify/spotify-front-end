import React, { useEffect, useRef, useState } from 'react';
import { FaList} from 'react-icons/fa';
import { MdOpenInFull } from "react-icons/md";
import { SlVolume1, SlVolume2, SlVolumeOff } from "react-icons/sl";
import { IoVolumeHighOutline } from "react-icons/io5";
import { useSpotifyContext } from '@/context/SpotifyContext';
import { BsMusicPlayer } from "react-icons/bs";
import { useSocketContext } from '@/context/SocketContext';
import FullScreen from './layouts/FullScreen';

const AudioSettings = () => {

    const { shareListenning, setShareListenning } = useSocketContext();
    const { volume, setVolume, toggleFullScreen } = useSpotifyContext();
    const [lastVolume, setLastVolume] = useState(20); 
    const [isMuted, setIsMuted] = useState(false);
    const [isHovered, setIsHovered] = useState(false)
    const [isFullScreen, setIsFullScreen] = useState(false);

    const isInitialRender = useRef(true);

    //Mute
    const handleMute = () => {
        setIsMuted(!isMuted);
    }

    // Update volume if muted
    useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return; // Skip the effect on initial render
    }
  
    if (isMuted) {
      setLastVolume(volume);
      setVolume(0);
    } else {
      setVolume(lastVolume);
    }
  }, [isMuted]);

    //Ajust volume
    const handleSetVolume = (e) => {
        setVolume(e.target.value);
        if (isMuted) {
            setIsMuted(false);
        } 
    }
    
    // const toggleFullScreen = () => {
    //     console.log('toggleFullScreen');
    //     console.log('isFullScreen :', isFullScreen)
    //     setIsFullScreen(!isFullScreen);
    //     console.log('setIsFullScreen to :', !isFullScreen)
    //   };

      
    return (
        <div className='flex items-center justify-center gap-4'>
            {!isFullScreen? (
                <>
            <BsMusicPlayer size={18} className={`cursor-pointer text-gray-500 ${shareListenning && 'text-primary'}`} 
                onClick={()=>setShareListenning(!shareListenning)} />
            <FaList size={18} className='text-gray-500 cursor-pointer' />
            <div 
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}>
                {
                    isMuted ? <SlVolumeOff size={18} className='text-gray-500 cursor-pointer' onClick={handleMute} /> 
                    : (
                        volume == 0 ? <SlVolumeOff  size={18} className='text-gray-500 cursor-pointer' onClick={handleMute} />
                        : volume <= 25 ? <SlVolume1 size={18} className='text-gray-500 cursor-pointer' onClick={handleMute} />
                        : volume <= 60 ? <SlVolume2 size={18} className='text-gray-500 cursor-pointer' onClick={handleMute} />
                        : <IoVolumeHighOutline size={22} className='text-gray-500 cursor-pointer' onClick={handleMute} />
                    )
                }
            </div>
            <input
            value={volume}
            style={{
                background: `linear-gradient(to right,
                    ${isHovered ? '#1db954' : '#fff'} 0%,
                    ${isHovered ? '#1db954' : '#fff'} ${volume}%,
                    #4d4d4d ${volume}%, #4d4d4d 100%)`,
                overflow: isHovered ? 'visible' : 'hidden',
            }}
            onChange={handleSetVolume}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            type='range'
            min='0'
            max='100'
            className='w-20 h-1 bg-gray-500 cursor-pointer'
            />
            <MdOpenInFull size={18} className='text-gray-500 cursor-pointer' onClick={toggleFullScreen} />
            </>
            ):(
                <FullScreen />
            )}
      </div>
    );
}

export default AudioSettings;
