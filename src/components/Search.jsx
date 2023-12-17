import React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import songsAPI from '@/apis/songs.api';
import SearchedSongCard from './SearchedSongCard';
import Lottie from 'lottie-react';
import LoadingSpotifyLottie from '../assets/lotties/loading-spotify.json';
import noResultLottie from '../assets/lotties/NoResult.json';
const Search = () => {
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const callRef = useRef(null);
  const [lottieResult, setLottieResult] = useState();

  useEffect(() => {
    if (input.length > 0) {
      setIsLoading(true);
      clearTimeout(callRef.current);
      callRef.current = setTimeout(() => {
        songsAPI
          .getSongs(input)
          .then((res) => {
            setIsLoading(false);
            console.log(res);
            setData(res);
            if (res.length === 0) {
              setLottieResult(noResultLottie);
              console.log('No music found');
            } else {
              setLottieResult(LoadingSpotifyLottie);
            }
          })
          .catch((err) => {
            setIsLoading(false);
            console.log('Error fetching songs:', err);
          });
      }, 500);
    } else {
      setData([]);
    }
  }, [input]);

  return (
    <>
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        className="w-96 h-10 rounded-full bg-[#312528] text-white text-center"
        type="text"
        placeholder="Search..."
      />
      {console.log('Rendered Data:', data)}
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Lottie animationData={lottieResult} />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 items-center justify-center pt-4">
            {data.map((item, index) => (
              <SearchedSongCard
                key={index}
                title={item.title}
                coverImage={item.coverImage}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
