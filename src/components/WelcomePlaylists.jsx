import playlistsAPI from '@/apis/playLists.api';
import songsAPI from '@/apis/songs.api';
import { useSpotifyContext } from '@/context/SpotifyContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IconPlay } from './utils/Elements';

const WelcomePlaylists = () => {

   const [playlists, setPlaylists] = useState([]);

   useEffect(() => {
        fetchPlayLists();
    }, []);

    const  fetchPlayLists = () => {
        playlistsAPI.getRecentsPlaylist()
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
      <div className='p-6 w-full h-full'>
        <span className='text-3xl font-bold'>Bonjour</span>
        <div className='grid grid-cols-3 gap-2 items-center justify-center pt-4'>
          {playlists.map((playlist, index) => (
            <PlaylistItem key={`${playlist._id}-${index}`} playlist={playlist} />
          ))}
        </div>
      </div>
    );
}

const PlaylistItem = ({ playlist }) => {

  const { playList, setPlayList, isPlaying, setIsPlaying } = useSpotifyContext();
  const router = useRouter();

  const coverImage = () => {
    if(playlist.title == 'Liked Songs') return (
      <img src="https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t500x500.jpg" 
      className='w-16 h-16 object-cover rounded-md' alt="" />
  )
    if (!playlist.songs?.length > 0)
      return (
        <img
          src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/spotify-style-illustration-album-art-2020-design-template-ff72ffd1b198e4a94ee8c58cceb1da19_screen.jpg?ts=1600257159'
          className='w-16 h-16 object-cover rounded-md'
          alt=''
        />
      );
    return (
      <div
        className={`w-16 h-16 grid ${
          playlist.songs.length != 1 ? 'grid-cols-2' : ' grid-cols-1'
        }`}
      >
        {playlist?.songs?.slice(0, 4).map((song, index) => (
          <div key={`${song._id}-${index}`}>
            <img
              src={song.coverImage}
              alt={song.title}
              className={`object-cover cursor-pointer w-full h-full`}
            />
          </div>
        ))}
      </div>
    );
  };

  const handlePlay = async () => {
    try{
      const playlistWithSongs = await playlistsAPI.getPlaylistById(playlist._id);
      setPlayList(playlistWithSongs);
      setIsPlaying(true);
    }
    catch(error){
        console.log(error)
    }
  };

   //handle pause audio
   const handlePause = () => {
    setIsPlaying(false);
  }

  return (
    <div className='flex relative gap-2 items-center bg-[#595959] bg-opacity-40 hover:bg-opacity-60 rounded-md cursor-pointer group'
    onClick={() => router.push(`/playlist/${playlist._id}`)}>
        <div>
          {coverImage()}
        </div>
        <span className='font-semibold'>{playlist.title} </span>
        <IconPlay 
          playlist={playlist} 
          size={44} 
          pauseStyle={'opacity-95 transition-all duration-300 absolute right-2'} 
          playStyle={'opacity-0 transform cursor-pointer group-hover:opacity-95 group-hover:translate-y-0 transition-all duration-300 absolute right-2'}
        />
        
        
    </div>
  );
}

export default WelcomePlaylists;
