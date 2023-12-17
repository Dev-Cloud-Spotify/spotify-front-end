'use client';
import { Inter } from 'next/font/google'
import './globals.css'
import { SpotifyProvider } from '@/context/SpotifyContext'
import SideBar from '@/components/layouts/SideBar';
import MediaPlayer from '@/components/layouts/MediaPlayer';

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <SpotifyProvider>

        <main className='w-screen h-screen overflow-hidden flex flex-col gap-1 p-2'>
          <div className="flex gap-2 h-[92%] w-full pb-1">
            <SideBar />
            {children}
          </div>

          <div className="max-h-[8%] z-50 bg-black">
            <MediaPlayer />
          </div>
      
        </main>
          </SpotifyProvider>
        </body>
    </html>
  )
}
