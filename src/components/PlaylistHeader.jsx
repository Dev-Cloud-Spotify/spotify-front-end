import React from 'react';
import { RxDotsHorizontal } from "react-icons/rx";
import { IconPlay } from './utils/Elements';

const PlaylistHeader = ({ playlist }) => {

    const coverImage = () => {
        if(!playlist?.songs?.length > 0) return (
            <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/spotify-style-illustration-album-art-2020-design-template-ff72ffd1b198e4a94ee8c58cceb1da19_screen.jpg?ts=1600257159" 
            className='w-60 h-60 object-cover rounded-md' alt="" />
        )
       return (
        <div className={`w-60 h-60 rounded-md grid ${playlist.songs.length!=1? 'grid-cols-2': ' grid-cols-1'}`}>
            {playlist?.songs?.slice(0,4).map((song, index) => (
                <div key={`${song._id}-${index}`} >
                    <img  src={song.coverImage} alt={song.title} 
                        className={`object-cover cursor-pointer w-full h-full`} 
                    />
                </div>
            ))}
        </div>
       )
    }


    return (
        <div className='flex flex-col gap-8 pt-12'>
            <div className='flex gap-6 items-end'>
                <div>
                    {coverImage()}
                </div>

                <div className='flex flex-col gap-4'>
                    <span>Playlist</span>
                    <div className='text-8xl font-bold'> {playlist?.title} </div>
                    <div> {playlist?.songs?.length} titre </div>
                </div>
            </div>

            <div className='flex gap-8 items-center'>
                <IconPlay playlist={playlist} size={54} />
                <RxDotsHorizontal size={32} className='text-[#fcfcfc] cursor-pointer' />
            </div>
        </div>
    );
}

export default PlaylistHeader;
