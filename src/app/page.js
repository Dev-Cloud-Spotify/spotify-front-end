'use client';

import MainWrapper from "@/components/layouts/MainWrapper";
import MediaPlayer from "@/components/layouts/MediaPlayer";
import SideBar from "@/components/layouts/SideBar";

export default function Home() {
  return (
    <main className='w-screen h-screen flex flex-col gap-1 p-2'>
      <div className="flex gap-2 h-[90%] w-full pb-1">
        <SideBar />
        <MainWrapper />
      </div>

      <MediaPlayer />
      
    </main>
  )
}
