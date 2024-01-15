import React from 'react';
import { IconPlay } from './utils/Elements';

const SearchedSongCard = ({ song }) => {
  const playlist = {
    _id: song?._id,
    title: song?.title,
    songs: [song],
}

  return (
    <div className=" bg-gray-800 flex flex-col gap-3 w-38 h-38 justify-center items-center p-4 rounded-lg hover:shadow-lg transition duration-300 ease-in-out">
      <div className='w-32 h-32 rounded-md relative group'>
        <img
          src={song.coverImage}
          alt={song.title}
          className="object-cover h-full w-full rounded-md cursor-pointer" 
          />
          <IconPlay
            playlist={playlist}
            size={44} 
            pauseStyle={'opacity-95 transition-all duration-300 absolute top-2 right-2'} 
            playStyle={'opacity-0 transform cursor-pointer group-hover:opacity-95 top-2 group-hover:translate-y-0 transition-all duration-300 absolute right-2'}
          />
        </div>
      <div className="text-white text-left font-semibold max-w-full">{song.title.length > 17 ? `${song.title.slice(0, 17)}...` : song.title}</div>
      <div className="text-white text-left max-w-full">{song.artist?.name.length > 17 ? `${song.artist?.name.slice(0, 17)}...` : song.artist?.name}</div>
    </div>
  );
};

export default SearchedSongCard;
