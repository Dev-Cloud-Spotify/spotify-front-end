import playlistsAPI from '@/apis/playLists.api';
import { useSpotifyContext } from '@/context/SpotifyContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';

const SideBarPlayLists = ({ inputSearch }) => {
    const [playlists, setPlaylists] = useState([]);
    const [filteredPlaylists, setFilteredPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    useEffect(() => {
        fetchPlayLists();
    }, []);

    const fetchPlayLists = () => {
        playlistsAPI.getPlaylists()
        .then((response) => {
            setPlaylists(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    //handle Search
    useEffect(() => {
        if (inputSearch) {
            const filtered = playlists.filter((playlist) => playlist.title.toLowerCase().includes(inputSearch.toLowerCase()));
            setFilteredPlaylists(filtered);
        } else {
            setFilteredPlaylists(playlists);
        }
    }, [inputSearch, playlists]);


    return (
        <div className='h-[92%] overflow-auto'>
            {filteredPlaylists.length === 0 && <div className='text-center h-full flex flex-col justify-center'>
                <span className='text-2xl font-semibold'>Unable de find &quot;{inputSearch}&quot;</span>
                <p className='text-gray'>Check spelling or use other keywords and try again</p>
            </div>}
            {filteredPlaylists?.map((playlist, index)=> (
                <PlaylistItem key={`${playlist._id}-${index}`} playlist={playlist} selectedPlaylist={selectedPlaylist} setSelectedPlaylist={setSelectedPlaylist} />
            ))}
        </div>
    );
}

const PlaylistItem = ({ playlist, selectedPlaylist, setSelectedPlaylist }) => {

    const router = useRouter();
    const { playList } = useSpotifyContext();

    const coverImage = () => {
        if(playlist.title == 'Liked Songs') return (
            <img src="https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t500x500.jpg" 
            className='w-12 h-12 object-cover rounded-md' alt="" />
        )
        if(!playlist.songs?.length > 0) return (
            <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/spotify-style-illustration-album-art-2020-design-template-ff72ffd1b198e4a94ee8c58cceb1da19_screen.jpg?ts=1600257159" 
            className='w-12 h-12 object-cover rounded-md' alt="" />
        )
       return (
        <div className={`w-12 h-12 rounded-md grid ${playlist.songs.length!=1? 'grid-cols-2': ' grid-cols-1'}`}>
        {playlist?.songs?.map((song, index) => (
            <div key={`${song._id}-${index}`}>
                <img  src={song.coverImage} alt={song.title} 
                    className={`object-cover cursor-pointer w-full h-full`} 
                />
            </div>

        ))}
    </div>
       )
    }

    //handle select playlist
    const handleSelectPlaylist = () => {
        setSelectedPlaylist(playlist._id);
        router.push(`/playlist/${playlist._id}`);
    }

    return (
        <div className={`items-center flex gap-2 rounded-md p-2  cursor-pointer ${selectedPlaylist === playlist._id ? 'bg-[#1a1a1a] hover:bg-[#393939]' : 'hover:bg-[#1a1a1a]'}`} onClick={handleSelectPlaylist}>
            {coverImage()}
            <div className='flex flex-col'>
               <span className={`${playList?._id === playlist._id && 'text-primary'} line-clamp-1`}>{playlist.title}</span> 
               <span className='flex items-center gap-1 text-gray line-clamp-1'> playlist <FaCircle size={8}/> {playlist.title}</span> 
            </div>
        </div>
    )
};

export default SideBarPlayLists;
