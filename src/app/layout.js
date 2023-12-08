'use client';
import { Inter } from 'next/font/google'
import './globals.css'
import { SpotifyProvider } from '@/context/SpotifyContext'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <SpotifyProvider>
            {children}
          </SpotifyProvider>
        </body>
    </html>
  )
}
