import React, { useEffect, useState } from 'react';
import { FaList} from 'react-icons/fa';
import { MdOpenInFull } from "react-icons/md";
import { SlVolume1, SlVolume2, SlVolumeOff } from "react-icons/sl";
import { IoVolumeHighOutline } from "react-icons/io5";

import { GoMute } from "react-icons/go";

const AudioSettings = () => {

    const [volume, setVolume] = useState(20);
    const [lastVolume, setLastVolume] = useState(20); //for unmute [lastVolume = volume]
    const [isMuted, setIsMuted] = useState(false);

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

    return (
        <div className='flex items-center justify-center gap-4'>
            <FaList size={18} className='text-gray-500 cursor-pointer' />
            {
                isMuted ? <SlVolumeOff size={18} className='text-gray-500 cursor-pointer' onClick={handleMute} /> 
                : (
                    volume == 0 ? <SlVolumeOff  size={18} className='text-gray-500 cursor-pointer' onClick={handleMute} />
                    : volume <= 25 ? <SlVolume1 size={18} className='text-gray-500 cursor-pointer' onClick={handleMute} />
                    : volume <= 60 ? <SlVolume2 size={18} className='text-gray-500 cursor-pointer' onClick={handleMute} />
                    : <IoVolumeHighOutline size={22} className='text-gray-500 cursor-pointer' onClick={handleMute} />
                )
            }
            <input
            value={volume}
            style={{background: `linear-gradient(to right, #1db954 0%, #1db954 ${volume}%, #4d4d4d ${volume}%, #4d4d4d 100%)`}}
            onChange={handleSetVolume}
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
