'use client';
import React from 'react';
import WelcomePlaylists from '../WelcomePlaylists';
import PlayLists from '../PlayLists';

const MainWrapper = () => {
    return (
        <div className='w-full h-full rounded-md bg-[#121212] max-h-full bg overflow-auto'>
            <div className='bg-gradient-to-b from-[#474747] to-[#121212] w-full h-[260px]'>
                <WelcomePlaylists/>
            </div>
            <div className='bg-[#121212] h-full'>
                <PlayLists />
            </div>
        </div>
    );
}

export default MainWrapper;
