import Head from 'next/head'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main>
        <h1 className="text-3xl font-bold underline">
          Hello world! This is a Next.js app with Mantine and TailwindCSS.
        </h1>
      </main>
    </>
  )
}
