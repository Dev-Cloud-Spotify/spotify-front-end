'use client';
import './globals.css'
import SideBar from '@/components/layouts/SideBar';
import MediaPlayer from '@/components/layouts/MediaPlayer';
import { SpotifyProvider } from '@/context/SpotifyContext'
import { SocketProvider } from '@/context/SocketContext';


export default function Layout({ children }) {
  return (
    <html lang="fr">
        <body>
          <SpotifyProvider>
            <SocketProvider>
                <main className='w-screen h-screen overflow-hidden flex flex-col gap-1 p-2'>
                  <div className="flex gap-2 h-[92%] w-full pb-1">
                    <SideBar />
                    {children}
                  </div>

                  <div className="max-h-[8%] z-50 bg-black">
                    <MediaPlayer />
                  </div>
                </main>
            </SocketProvider>
          </SpotifyProvider>
        </body>
    </html>
  )
}
