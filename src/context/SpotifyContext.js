//Spotify Context
'use client';
import React, { useState, useEffect, createContext, useContext, useRef } from "react";

export const SpotifyContext = createContext();

export const SpotifyProvider = ({ children }) => {
    
    const audioRef = useRef(new Audio());
    const [playList, setPlayList] = useState(localStorage.getItem('playlist') ? JSON.parse(localStorage.getItem('playlist')) : {});
    const [track, setTrack] = useState(localStorage.getItem('track') ? JSON.parse(localStorage.getItem('track')) : {});
    const [tracks, setTracks] = useState(localStorage.getItem('playlist') ? JSON.parse(localStorage.getItem('playlist')).songs : []); 
    const [volume, setVolume] = useState(localStorage.getItem('volume') ? JSON.parse(localStorage.getItem('volume')) : 20);
    const [isPlaying, setIsPlaying] = useState(false);
    
    useEffect(() => {
        console.log('track changed');
        localStorage.setItem('track', JSON.stringify(track));
    }, [track]);

    useEffect(() => {
        audioRef.current.volume = volume / 100;
        console.log('volume changed', audioRef.current.volume);
        localStorage.setItem('volume', JSON.stringify(volume));
    }, [volume]);

    useEffect(() => {
        console.log('tracks changed');
    }, [tracks]);

    useEffect(() => {
        console.log('playlist changed');
        localStorage.setItem('playlist', JSON.stringify(playList));
        setTracks(playList.songs)
    }, [playList]);

    
    return (
        <SpotifyContext.Provider
        value={{
            audioRef,
            track,
            setTrack,
            tracks,
            setTracks,
            volume,
            setVolume,
            playList,
            setPlayList,
            isPlaying,
            setIsPlaying
        }}
        >
        {children}
        </SpotifyContext.Provider>
    );
}
export function useSpotifyContext() {
    return useContext(SpotifyContext);
}