import React, { useEffect, useState } from 'react';
import { FaList} from 'react-icons/fa';
import { MdOpenInFull } from "react-icons/md";
import { SlVolume1, SlVolume2, SlVolumeOff } from "react-icons/sl";
import { IoVolumeHighOutline } from "react-icons/io5";
import { useSpotifyContext } from '@/context/SpotifyContext';

const AudioSettings = () => {

    const { volume, setVolume } = useSpotifyContext();
    const [lastVolume, setLastVolume] = useState(20); //for unmute [lastVolume = volume]
    const [isMuted, setIsMuted] = useState(false);
    const [isHovered, setIsHovered] = useState(false)

    //Mute
    const handleMute = () => {
        setIsMuted(!isMuted);
    }

    //update volume if muted
    useEffect(() => {
        if (isMuted) {
            setLastVolume(volume);
            setVolume(0);
        }
        else {
            setVolume(lastVolume);
        }

    }, [isMuted])

    //Ajust volume
    const handleSetVolume = (e) => {
        setVolume(e.target.value);
        if (isMuted) {
            setIsMuted(false);
        }
        
    }

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
      };
      const handleMuteToggle = () => {
        // Toggle between muting and unmuting
        const newVolume = audioRef.current.volume === 0 ? 1 : 0;
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
      };

    return (
        <div className='flex items-center justify-center gap-4'>
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
            onMou
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
            <MdOpenInFull size={18} className='text-gray-500 cursor-pointer' />
            
      </div>
    );
}

export default AudioSettings;