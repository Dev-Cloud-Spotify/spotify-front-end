import React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import songsAPI from '@/apis/songs.api';
const Search = () => {
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const callRef = useRef(null);

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
          })
          .catch((err) => {
            setIsLoading(false);
            console.log('Error fetching songs:', err);
          });
      }, 300);
    }
  }, [input]);

  return (
    <>
      <div className="flex justify-left items-center w-full h-full ml-2">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="w-96 h-10 rounded-full bg-[#312528] text-white text-center"
          type="text"
          placeholder="Search..."
        />
      </div>
      <div>
        {isLoading ? <div className="spinner"></div> : null}
        {console.log(
          data
            .map((item, index) => <div key={index}>{item.name}</div>)
            .slice(0, 5)
        )}
        {data
          .map((item, index) => <div key={index}>{item.name}</div>)
          .slice(0, 5)}
      </div>
    </>
  );
};

export default Search;
