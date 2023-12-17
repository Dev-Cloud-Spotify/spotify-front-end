import React from 'react';

const SearchedSongCard = ({ title, coverImage }) => (
  <div className="text-center bg-gray-800 p-4 rounded-lg hover:shadow-lg transition duration-300 ease-in-out">
    <div className="w-32 h-32 mb-2 overflow-hidden rounded-md">
      <img
        src={coverImage}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="text-white">{title}</div>
  </div>
);

export default SearchedSongCard;
