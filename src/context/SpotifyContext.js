//Spotify Context
'use client';
import React, { useState, useEffect, createContext, useContext, useRef } from "react";

export const SpotifyContext = createContext();

export const SpotifyProvider = ({ children }) => {
    
    const audioRef = useRef(new Audio());
    const [playList, setPlayList] = useState(localStorage.getItem('playlist') ? JSON.parse(localStorage.getItem('playlist')) : null);
    const [track, setTrack] = useState(localStorage.getItem('track') ? JSON.parse(localStorage.getItem('track')) : null);
    const [tracks, setTracks] = useState(localStorage.getItem('playlist') ? JSON.parse(localStorage.getItem('playlist'))?.songs : []); 
    const [volume, setVolume] = useState(localStorage.getItem('volume') ? localStorage.getItem('volume') : 20);
    const [isPlaying, setIsPlaying] = useState(false);
    
    useEffect(() => {
        if(!track) return;
        console.log('track changed');
        localStorage.setItem('track', JSON.stringify(track));
    }, [track]);

    useEffect(() => {
        audioRef.current.volume = volume / 100;
        console.log('volume changed', audioRef.current.volume);
        localStorage.setItem('volume', volume);
    }, [volume]);

    useEffect(() => {
        console.log('tracks changed');
    }, [tracks]);

    useEffect(() => {
        console.log('playlist changed');
        if(!playList) return;
        localStorage.setItem('playlist', JSON.stringify(playList));
        setTracks(playList?.songs)
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