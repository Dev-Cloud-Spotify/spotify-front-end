import { useSpotifyContext } from '@/context/SpotifyContext';
import React from 'react';

const WelcomePlaylists = () => {

    const { test } = useSpotifyContext();
    
    return (
        <div>
            Bonjour {test}
        </div>
    );
}

export default WelcomePlaylists;
