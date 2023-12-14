//Spotify Context
'use client';
import React, { useState, useEffect, createContext, useContext, useRef } from "react";

export const SpotifyContext = createContext();

export const SpotifyProvider = ({ children }) => {
    
    const audioRef = useRef(new Audio());
    const [track, setTrack] = useState({});
    const [tracks, setTracks] = useState([]); 
    const [volume, setVolume] = useState(20);
    
    useEffect(() => {
        audioRef.current.src = track.CFurl;
        console.log('track changed', track);
    }, [track]);

    useEffect(() => {
        audioRef.current.volume = volume / 100;
        console.log('volume changed', audioRef.current.volume);
    }, [volume]);

    
    return (
        <SpotifyContext.Provider
        value={{
            audioRef,
            track,
            setTrack,
            tracks,
            setTracks,
            volume,
            setVolume
        }}
        >
        {children}
        </SpotifyContext.Provider>
    );
}
export function useSpotifyContext() {
    return useContext(SpotifyContext);
}