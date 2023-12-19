import React from 'react';
import { RxDotsHorizontal } from "react-icons/rx";
import { IconPlay } from './utils/Elements';
import { FaCircle } from 'react-icons/fa';

const PlaylistHeader = ({ playlist }) => {

    const coverImage = () => {
        if(playlist?.coverImage) return (
            <img src={playlist?.coverImage} className='w-60 h-60 object-cover rounded-md' alt="" />
        )
        if(playlist?.title == 'Liked Songs') return (
            <img src="https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t500x500.jpg" 
            className='w-60 h-60 object-cover rounded-md' alt="" />
        )
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

    const totalNumberOfListens = (songs) => {
        let total = 0;
        songs?.forEach(song => {
            total += song.listens;
        });
        return total;
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
                    <div className='flex items-center gap-2'> 
                        {playlist?.songs?.length} {playlist?.songs?.length > 1? 'titles': 'title'}  
                        <FaCircle className='mx-2' size={4} />
                        {totalNumberOfListens(playlist?.songs)} listennings
                    </div>
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
