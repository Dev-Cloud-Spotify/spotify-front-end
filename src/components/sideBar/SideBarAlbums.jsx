import albumsAPI from '@/apis/albums.api';
import { useSpotifyContext } from '@/context/SpotifyContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BiSolidVolumeFull } from 'react-icons/bi';


const SideBarAlbums = ({ inputSearch }) => {

    const router = useRouter()
    const [albums, setAlbums] = useState([]);
    const [filteredAlbums, setFilteredAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = () => {
        albumsAPI.getAlbums()
        .then((response) => {
            setAlbums(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    //handle Search
    useEffect(() => {
        if (inputSearch) {
            const filtered = albums.filter((album) => 
            album.title.toLowerCase().includes(inputSearch.toLowerCase()) 
            || album.artist?.name.toLowerCase().includes(inputSearch.toLowerCase()) 
            || album.artist?.lastName.toLowerCase().includes(inputSearch.toLowerCase()));
            setFilteredAlbums(filtered);
        } else {
            setFilteredAlbums(albums);
        }
    }, [inputSearch, albums]);

    
        

    return (
        <div className='h-[92%] overflow-auto'>
            {filteredAlbums.length === 0 && <div className='text-center h-full flex flex-col justify-center'>
                <span className='text-2xl font-semibold'>Unable to find &quot;{inputSearch}&quot;</span>
                <p className='text-gray'>Check spelling or use other keywords and try again</p>
            </div>}
            {filteredAlbums?.map((album)=> (
                <AlbumItem key={album._id} album={album} selectedAlbum={selectedAlbum} setSelectedAlbum={setSelectedAlbum} />
            ))}
        </div>
    );
}

const AlbumItem = ({ album, selectedAlbum, setSelectedAlbum }) => {
    
        const router = useRouter();
        const { playList, isPlaying } = useSpotifyContext();
    
        const coverImage = () => {
            if(album.title == 'Liked Songs') return (
                <img src="https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t500x500.jpg" 
                className='w-12 h-12 object-cover rounded-md' alt="" />
            )
            if(album.coverImage) return (
                <img src={album.coverImage} className='w-12 h-12 object-cover rounded-md' alt="" />
            )
            return (
                <div className='w-12 h-12 rounded-md bg-gray-700 flex items-center justify-center'>
                    <BiSolidVolumeFull className='text-white text-2xl' />
                </div>
            )
        }

        const handleSelectAlbum = (album) => {
            setSelectedAlbum(album._id)
            router.push(`/album/${album._id}`)
        };
    
        return (
            <div className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${selectedAlbum === album._id ? 'bg-gray-700' : ''}`} onClick={() => handleSelectAlbum(album)}>
                <div className='flex gap-2'>
                    {coverImage()}
                    <div className='ml-3 flex flex-col'>
                        <span className={`${playList?._id === album._id && 'text-primary'} line-clamp-1 font-semibold`}>{album.title}</span>
                        <span className='text-xs text-gray-400'>{album.artist?.name} {album.artist?.lastName}</span>
                    </div>
                </div>
                {playList?._id === album._id && isPlaying && <BiSolidVolumeFull size={18} className='text-primary' /> }
            </div>
        );
    }

export default SideBarAlbums;
