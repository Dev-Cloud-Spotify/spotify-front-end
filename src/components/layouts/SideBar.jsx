import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { GoArrowRight, GoHome, GoPlus, GoSearch } from "react-icons/go";
import { LuLibrary } from "react-icons/lu";

import { FaList } from 'react-icons/fa';

//lazy load SideBarPlayLists
const SideBarPlayLists = React.lazy(() => import('../sideBar/SideBarPlayLists'));
const SideBarAlbums = React.lazy(() => import('../sideBar/SideBarAlbums'));
const SideBarArtists = React.lazy(() => import('../sideBar/SideBarArtists'));

const SideBar = () => {

    const inputRef = useRef()
    const [selectedMenu, setSelectedMenu] = useState('Playlists')
    const [menuItems, setMenuItems] = useState([
        {title: 'Albums', action: () => setSelectedMenu('Albums')},
        {title: 'Artists', action: () => setSelectedMenu('Artists')},
        {title: 'Playlists', action: () => setSelectedMenu('Playlists')},
    ])
    const [showInput, setShowInput] = useState(false);
    const [inputSearch, setInputSearch] = useState('');

    //close input on outside click
    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
          // Clicked outside the input, hide it
          setShowInput(false);
        }
      };
    
      useEffect(() => {
        // Attach the event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);
    
        // Detach the event listener when the component unmounts
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

      const MENU = () => {
        switch (selectedMenu) {
            case 'Playlists':
                return (
                <Suspense fallback={<div>Loading...</div>}>
                    <SideBarPlayLists inputSearch={inputSearch} />
                </Suspense>
                )
            case 'Albums':
               return (
                <Suspense fallback={<div>Loading...</div>}>
                    <SideBarAlbums inputSearch={inputSearch} />
                </Suspense>
               )
            case 'Artists':
                return (
                    <Suspense fallback={<div>Loading...</div>}>
                        <SideBarArtists inputSearch={inputSearch} />
                    </Suspense>
                )
            default:
                return (
                <Suspense fallback={<div>Loading...</div>}>
                    <SideBarPlayLists inputSearch={inputSearch} />
                </Suspense>
                )
            }
      }

    

    return (
        <div className='sm:w-[400px] sm:min-w-[400px] w-[100px] min-w-[100px] rounded-md flex flex-col gap-2 h-full'>
            <div className='bg-background rounded-md p-5 flex flex-col gap-6 text-gray font-semibold'>
                <div className='flex gap-5 items-center cursor-pointer hover:text-white transition-all'>
                    <GoHome size={26} className='text-white text-2xl' />
                    <span>Home</span>
                </div>
                <div className='flex gap-5 items-center hover:text-white cursor-pointer transition-all'>
                    <GoSearch size={26} className='text-white text-2xl' />
                    <span>Search</span>
                </div>
            </div>
            <div className='bg-background rounded-md p-5 flex flex-col gap-4 h-full overflow-hidden'>
                <div className='flex justify-between text-gray font-semibold'>
                    <div className='flex gap-2 cursor-pointer hover:text-white transition-all'>
                        <LuLibrary size={26} className='text-2xl' />
                        <span>Library</span>
                    </div>
                    <div className='flex gap-1'>
                        <div className="relative overflow-visible group cursor-pointer">
                            <div className="flex text-sm absolute -left-10 -top-10 whitespace-nowrap bg-[#272727] rounded-md text-white px-2 py-1 shadow-xl opacity-0 group-hover:opacity-95 delay-500 transition-all">
                                Create a playlist
                            </div>
                            <GoPlus size={40} className='text-2xl hover:rounded-full hover:bg-[#272727] p-2' />
                        </div>
                        <GoArrowRight size={40} className='text-2xl hover:rounded-full hover:bg-[#272727] p-2' />
                    </div>
                </div>

                <div className='flex gap-2'>
                    {menuItems.map((item, index) => (
                        <div key={index} className={`cursor-pointer hover:opacity-60 flex gap-2 items-center rounded-full px-3 py-1 bg-[#2a2a2a2a] ${item.title == selectedMenu && 'bg-white text-black'} transition-all`} onClick={item.action}>
                            <span>{item.title}</span>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between items-center'>
                        <div className='flex items-center' ref={inputRef}>
                        <GoSearch className={`z-50 cursor-pointer ${!showInput && 'hover:rounded-full hover:bg-[#272727]'} p-2  transition-all`} size={34} onClick={()=>setShowInput(true)} /> 
                        {showInput && (
                                <input
                                    className='outline-none bg-[#272727] pl-8 py-1 rounded-md -ml-8'
                                    type="text"
                                    placeholder="Search in library"
                                    value={inputSearch}
                                    onChange={(e) => setInputSearch(e.target.value)}
                                />
                            )}
                        </div>
                       <div className='flex items-center gap-2 text-gray hover:scale-105 hover:text-white transition-all cursor-pointer'>
                            <span className='text-sm '>Recents</span>
                            <FaList />
                       </div>
                </div>

                <div className='h-full overflow-hidden'>
                    {MENU()}
                </div>
            </div>
        </div>
    );
}

export default SideBar;
