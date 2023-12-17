import React from 'react';

const SearchedSongCard = ({ song }) => (
  <div className=" bg-gray-800 flex flex-col gap-3 w-38 h-38 justify-center items-center p-4 rounded-lg hover:shadow-lg transition duration-300 ease-in-out">
      <img
        src={song.coverImage}
        alt={song.title}
        className="object-cover w-32 h-32 rounded-md" 
        />
    <div className="text-white text-left font-semibold max-w-full">{song.title.length > 17 ? `${song.title.slice(0, 17)}...` : song.title}</div>
    <div className="text-white text-left max-w-full">{song.artist?.name.length > 17 ? `${song.artist?.name.slice(0, 17)}...` : song.artist?.name}</div>

  </div>
);

export default SearchedSongCard;
