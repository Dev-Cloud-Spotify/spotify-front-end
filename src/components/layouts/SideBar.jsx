import React from 'react';
import { GoArrowRight, GoHome, GoPlus, GoSearch } from "react-icons/go";
import { LuLibrary } from "react-icons/lu";
import SideBarPlayLists from '../SideBarPlayLists';

const SideBar = () => {

    return (
        <div className='w-[430px] rounded-md h-full flex flex-col gap-2'>
            <div className='bg-background rounded-md p-5 flex flex-col gap-6'>
                <div className='flex gap-5 items-center'>
                    <GoHome size={26} className='text-white text-2xl' />
                    <span>Accueil</span>
                </div>
                <div className='flex gap-5 items-center'>
                    <GoSearch size={26} className='text-white text-2xl' />
                    <span>Rechercher</span>
                </div>
            </div>
            <div className='bg-background rounded-md p-5 flex flex-col gap-4 h-full'>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <LuLibrary size={26} className='text-white text-2xl' />
                        <span>Bibliothèque</span>
                    </div>
                    <div className='flex gap-6'>
                        <GoPlus size={26} className='text-white text-2xl' />
                        <GoArrowRight size={26} className='text-white text-2xl' />
                    </div>

                </div>

                <div className='bg-purple-700 h-full overflow-auto'>
                    <SideBarPlayLists />
                </div>
            </div>
        </div>
    );
}

export default SideBar;
