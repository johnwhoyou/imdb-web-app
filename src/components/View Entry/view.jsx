import { Montserrat } from "next/font/google";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const montserrat = Montserrat({
    subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
    style: ['normal', 'italic']
})

export default function View_Entry({ movie_id }){

    const [ name, setName ] = useState("")
    const [ year, setYear ] = useState()
    const [ genre, setGenre ] = useState("")
    const [ director, setDirector ] = useState("")
    const [ actor1, setActor1 ] = useState("")
    const [ actor2, setActor2 ] = useState("")

    const [ genres, setGenres ] = useState([])

    const [ valid, setValid ] = useState(false)

    const router = useRouter()

    useEffect(() => {
        if(!router.isReady)
            return

        const fetchData = () => {
            if(movie_id)
                axios.get(`/api/movies?movie_id=${movie_id}`)
                .then((res) => {
                    setName(res.data.movie.name)
                    setYear(res.data.movie.year)
                    setGenre(res.data.movie.genre)
                    setDirector(res.data.movie.director)
                    setActor1(res.data.movie.actor1)
                    setActor2(res.data.movie.actor2)
                    setGenres(res.data.genres)
                    
                    setValid(true)

                }).catch((error) => {
                    router.push("/search")
                    console.log(error.message)
                })
        }

        fetchData()

    }, [router.isReady, movie_id])


    if(!valid){
        return null
    }

    else
    return (
        <div
            className={`flex flex-col w-full min-h-[100vh] h-fit bg-slate-50 pt-10 relative ${montserrat.className}`}
        >
            <div className="flex w-full h-full bg-slate-200 p-10">
            <div className="absolute w-full h-full top-0 left-0 right-0 mx-auto z-0 opacity-80 pointer-events-none">
                <div className="w-full h-full relative select-none">
                <Image src={"/view_bg.jpg"} alt={""} fill priority />
                </div>
            </div>

            <div className="w-3/4 lg:w-1/2 mx-auto bg-white z-10 bg-opacity-95 rounded-xl p-10 overflow-auto relative">
                
                <div className="flex xl:gap-5 mb-5 opacity-100">
                <p className="my-auto text-center w-full text-[18px] sm:text-[24px] lg:text-[32px] xl:text-[36px] font-bold">
                    VIEW AN ENTRY
                </p>
                <div className="relative xl:w-[200px] xl:h-[70px] drop-shadow-lg cursor-pointer hover:brightness-95">
                    <Image
                    src={"/sample_logo.png"}
                    alt={""}
                    fill
                    sizes="(max-width: 200px)"
                    />
                </div>
                </div>

                <form
                action=""
                className="flex flex-col xl:text-[20px] opacity-100"
                >
                <label htmlFor="title" className="font-semibold mb-2">
                    Movie Title
                </label>
                <p className={`${montserrat.className} mb-10 border border-black border-opacity-30 w-full sm:w-2/3 py-2 px-5 shadow-md  rounded-lg text-[16px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}>
                    { name ? name : "-- N/A --"}
                </p>

                <div className="flex flex-col gap-0 md:flex-row md:gap-10 mb-5 w-full">
                    <section className="flex flex-col w-1/2">
                        <label htmlFor="title" className="font-semibold mb-2">
                            Year Released
                        </label>
                        <p className={`${montserrat.className} sm:w-3/4 mb-5 border border-black border-opacity-30 py-2 px-5 shadow-md rounded-lg text-[16px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}>
                            {year ? year : "-- N/A --"}
                        </p>
                    </section>
                </div>

                <div className="flex flex-col gap-0 md:flex-row md:gap-10 mb-5">
                    <section className="flex flex-col w-full">
                        <label htmlFor="genre" className="font-semibold mb-2">
                            Genre
                        </label>
                        <p className={`${montserrat.className} mb-10 border border-black border-opacity-30 w-full sm:w-2/3 md:w-full py-2 px-5 shadow-md  rounded-lg text-[16px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}>
                            {genre ? genre : "-- N/A --"}
                        </p>
                    </section>

                    <section className="flex flex-col w-full">
                        <label htmlFor="directors" className="font-semibold mb-2">
                            Movie Director
                        </label>
                        <p className={`${montserrat.className} mb-10 border border-black border-opacity-30 w-full sm:w-2/3 md:w-full py-2 px-5 shadow-md  rounded-lg text-[16px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}>
                            {director ? director : "-- N/A --"}
                        </p>
                    </section>
                </div>

                <div className="flex flex-col gap-0 md:flex-row md:gap-10 mb-10">
                    <section className="flex flex-col w-full">
                        <label htmlFor="genre" className="font-semibold mb-2">
                            First Actor
                        </label>
                        <p className={`${montserrat.className} sm:w-full mb-5 border border-black border-opacity-30 py-2 px-5 shadow-md  rounded-lg text-[16px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}>
                            {actor1 ? actor1 : "-- N/A --"}
                        </p>
                    </section>

                    <section className="flex flex-col w-full">
                        <label htmlFor="directors" className="font-semibold mb-2">
                            Second Actor
                        </label>
                        <p className={`${montserrat.className} sm:w-full mb-5 border border-black border-opacity-30 py-2 px-5 shadow-md  rounded-lg text-[16px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}>
                            {actor2 ? actor2 : "-- N/A --"}
                        </p>
                    </section>
                </div>
                </form>
          </div>
        </div>
      </div>
    );
}
