import playlistsAPI from '@/apis/playLists.api';
import { useSpotifyContext } from '@/context/SpotifyContext';
import React, { useEffect, useState } from 'react';
import { FaCirclePause, FaCirclePlay } from 'react-icons/fa6';

const PlayLists = () => {

    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        fetchPlayLists();
    }, []);

    const fetchPlayLists = () => {
        playlistsAPI.getPlaylists()
        .then((response) => {
            //add only playlists with songs
            const filtered = response.filter((playlist) => playlist.songs.length > 0);
            setPlaylists(filtered);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className='p-4 pt-6 h-full'>
           <span className='text-2xl font-bold'>Concu pour Vous </span>
           <div className='pt-2 flex flex-wrap gap-4 justify-start'>
            {/* PlayLists  */}
            {playlists?.map((playlist, index) => (
                <PlayListCard key={`${playlist._id}-${index}`} playlist={playlist} />
            ))}
           </div>
        </div>
    );
}


const PlayListCard = ({ playlist }) => {

    const { playList, setPlayList, isPlaying, setIsPlaying } = useSpotifyContext();

    //handle cover image
    const coverImage = () => {
        if(!playlist.songs?.length > 0) return (
            <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/spotify-style-illustration-album-art-2020-design-template-ff72ffd1b198e4a94ee8c58cceb1da19_screen.jpg?ts=1600257159" 
            className='w-36 h-36 object-cover rounded-md' alt="" />
        )
       return (
        <div className={`w-36 h-36 rounded-md grid ${playlist.songs.length!=1? 'grid-cols-2': ' grid-cols-1'}`}>
            {playlist?.songs?.slice(0,4).map((song, index) => (
                <div key={`${song._id}-${index}`}>
                    <img  src={song.coverImage} alt={song.title} 
                        className={`object-cover rounded-md cursor-pointer w-full h-full`} 
                    />
                </div>
            ))}
        </div>
       )
    }

    //handle select playlist
    const handleSelectPlaylist = async () => {
        try{
            const playlistWithSongs = await playlistsAPI.getPlaylistById(playlist._id);
            setPlayList(playlistWithSongs);
            setIsPlaying(true);
        }
        catch(error){
            console.log(error)
        }
    }

    //handle pause audio
    const handlePauseAudio = () => {
        setIsPlaying(false);
    }

    return (
        <div className='bg-[#161616] hover:bg-[#252525] p-4 flex flex-col gap-1 rounded-md w-44 transition-all group shadow-xl'>
            <div className='relative'>
                {coverImage()}
                {playList?._id === playlist._id && isPlaying? (
                    <FaCirclePause size={48}  
                    className='absolute right-2 bottom-2 text-primary bg-black rounded-full cursor-pointer opacity-95 transition-all duration-300 hover:scale-105'
                    onClick={handlePauseAudio} /> 
                ) : (
                   <FaCirclePlay size={48}  
                    className='absolute right-2 bottom-2 text-primary bg-black rounded-full opacity-0 transform translate-y-4 cursor-pointer group-hover:opacity-95 group-hover:translate-y-0 transition-all duration-300 hover:scale-105'
                    onClick={handleSelectPlaylist} /> 
                )}
                
            </div>
            <span className='text-sm font-bold pt-3'>{playlist.title}</span>
            <div>
                {playlist.songs?.length > 0 && playlist.songs?.slice(0, 4).map((song, index) => (
                <span key={`${song._id}-${index}`} className='text-xs'>
                    {song.title}
                    {index !== 3 && index !== playlist.songs.length - 1 && ', '}
                </span>
                ))}
                {playlist.songs?.length > 3 && (
                <span className='text-xs'> and more...</span>
                )}
            </div>
        </div>
    );
}

export default PlayLists;
