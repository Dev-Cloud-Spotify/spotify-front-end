'use client';

import MainWrapper from "@/components/layouts/MainWrapper";
import MediaPlayer from "@/components/layouts/MediaPlayer";
import SideBar from "@/components/layouts/SideBar";

export default function Home() {
  return (
    <main className='w-screen h-[100vh] flex flex-col gap-1 p-2'>
      <div className="flex gap-2 h-[92%] w-full pb-1">
        <SideBar />
        <MainWrapper />
      </div>

      <div className="">
        <MediaPlayer />
      </div>
      
    </main>
  )
}
