'use client';
import React from 'react';
import WelcomePlaylists from '../WelcomePlaylists';
import PlayLists from '../PlayLists';

const MainWrapper = () => {
    return (
        <div className='w-full h-full rounded-md bg-[#312528] max-h-full overflow-auto'>
            <div className='bg-pink-600 w-full h-[260px]'>
                <WelcomePlaylists/>
            </div>
            <div className='bg-blue-400 h-full'>
                <PlayLists />
            </div>
        </div>
    );
}

export default MainWrapper;
