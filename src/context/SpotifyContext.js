//Spotify Context
'use client';
import React, { useState, useEffect, createContext, useContext, useRef } from "react";

export const SpotifyContext = createContext();

export const SpotifyProvider = ({ children }) => {
    
    const audioRef = useRef(
        typeof Audio !== "undefined" ? new Audio("") : undefined
      );
    const [playList, setPlayList] = useState(
        typeof window !== 'undefined' && localStorage.getItem('playlist')
            ? JSON.parse(localStorage.getItem('playlist'))
            : null
    );
    const [track, setTrack] = useState(
        typeof window !== 'undefined' && localStorage.getItem('track')
            ? JSON.parse(localStorage.getItem('track'))
            : null
    );
    const [tracks, setTracks] = useState(
        typeof window !== 'undefined' && localStorage.getItem('playlist')
            ? JSON.parse(localStorage.getItem('playlist'))?.songs
            : []
    );
    const [volume, setVolume] = useState(
        typeof window !== 'undefined' && localStorage.getItem('volume')
            ? localStorage.getItem('volume')
            : 20
    );
    const [isPlaying, setIsPlaying] = useState(false);

    const [isFullScreen, setIsFullScreen] = useState(false);
    
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

    const toggleFullScreen = () => {
        console.log('toggleFullScreen');
        console.log('isFullScreen :', isFullScreen)
        setIsFullScreen(!isFullScreen);
        console.log('setIsFullScreen to :', !isFullScreen)
      }

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
            setIsPlaying,
            isFullScreen,
            setIsFullScreen,
            toggleFullScreen
        }}
        >
        {children}
        </SpotifyContext.Provider>
    );
}
export function useSpotifyContext() {
    return useContext(SpotifyContext);
}