//Spotify Context
'use client';
import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

export const SpotifyContext = createContext();

export const SpotifyProvider = ({ children }) => {
    const [test, setTest] = useState("test");

    const [playlists, setPlaylists] = useState([]);
    const [playlist, setPlaylist] = useState({});
    const [tracks, setTracks] = useState([]);
    const [track, setTrack] = useState({});
    
    
    return (
        <SpotifyContext.Provider
        value={{
           test,
        }}
        >
        {children}
        </SpotifyContext.Provider>
    );
}
export function useSpotifyContext() {
    return useContext(SpotifyContext);
}