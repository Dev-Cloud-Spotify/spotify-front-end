import { useSpotifyContext } from '@/context/SpotifyContext';
import React, { useState } from 'react';
import { FaHeart, FaPause, FaPlay } from 'react-icons/fa';

const PLaylistSongs = ({ songs, playlist }) => {


    return (
        <div className='flex w-full'>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th className='text-center'>#</th>
                        <th className='text-left max-w-[28%]'>Title</th>
                        <th className='text-left'>Album</th>
                        <th className='text-left'>Date</th>
                        <th className='text-right'> {' '} </th>
                        <th className='text-right'>Time</th>
                    </tr>
                </thead>
                {/* divider  */}
                
                <tbody>
                    <tr>
                        <td colSpan='6' className='border-b-2 border-gray-600'></td>
                    </tr>
                    {/* Empty row for space */}
                    <tr>
                        <td colSpan='6' className='h-4'></td>
                    </tr>
                    {songs?.map((song, index) => (
                        <SongRow key={`${song._id}-${index}`} song={song} index={index+1} playlist={playlist} />
                    ))}
                </tbody>
            </table>
            
        </div>
    );
}

const SongRow = ({ song, index, playlist }) => {

    const { track, setTrack, playList, setPlayList, setIsPlaying, isPlaying } = useSpotifyContext();
    const [isHover, setIsHover] = useState(false);

    const getDate = (date) => {
        // transform 2023-12-07T20:15:37.457Z to 07 dec 2023
        const d = new Date(date);
        const day = d.getDate();
        const month = d.getMonth();
        const year = d.getFullYear();
        const months = ['jan.', 'fev.', 'mar.', 'avr.', 'mai.', 'juin.', 'juil.', 'aout.', 'sep.', 'oct.', 'nov.', 'dec.'];
        return `${day} ${months[month]} ${year}`;
    }

    const getTime = (time) => {
        //time in seconds display in min:sec (ex: 3:00) + display 0 if sec < 10 (ex: 3:03)
        const min = Math.floor(time/60);
        const sec = Math.floor(time%60);
        return `${min}:${sec<10? '0'+sec: sec}`;
    }

    const handleSelectTrack = () => {
        if(track._id === song._id) setIsPlaying(true)
        if(playlist._id !== playList._id){
            setPlayList(playlist);
        }
        if(track._id !== song._id){
            setTrack(song);
            setIsPlaying(true)
        }
    }
    
    return (
        <tr className='hover:bg-[#2a2a2a] hover:bg-opacity-90 rounded-md cursor-pointer' 
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        >
        <td className='flex items-center justify-center  h-full p-[5px]'>
            {isHover? (
                <>
                {song._id === track._id && isPlaying? (
                    <FaPause size={16} className='text-lg mt-[14px] text-[#b3b3b3]' onClick={() => setIsPlaying(false)} />
                ) : (
                    <FaPlay size={16} className='text-lg mt-[14px] text-[#b3b3b3]' onClick={handleSelectTrack} />
                )}
                </>
            ) : (
            <div className={`text-lg mt-2 ${song._id === track._id && 'text-primary'}`}>{index}</div> 
            )}
        </td>
        <td className='p-[5px]'>
            <div className='flex items-center justify-start gap-3'>
                <img src={song.coverImage} alt={song.title} className='rounded-md h-10 w-10 object-cover' />
                <div className='flex flex-col justify-start text-left'>
                    <div className={`font-semibold ${song._id === track._id && 'text-primary'}`}>{song.title}</div>
                    <div className='text-[#b3b3b3] text-sm'>{song.artist?.name} {song.artist?.lastName}</div>
                </div>
            </div>
        </td>
        <td className='p-[5px]'>{song.album?.title || ' - '}</td>
        <td className='p-[5px]'>{getDate(song.createdAt)}</td>
        <td className='flex justify-end items-center'> 
            <FaHeart size={20} className='text-primary'/> 
        </td>
        <td className='text-end p-[5px]'>
            {getTime(song.duration) || ' - '}
        </td>
    </tr>
    )
}

export default PLaylistSongs;
