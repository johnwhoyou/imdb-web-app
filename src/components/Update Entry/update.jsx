import { Montserrat } from "next/font/google";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const montserrat = Montserrat({
    subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
    style: ['normal', 'italic']
})

export default function Update_entry({ movie_id }){

    const [ name, setName ] = useState("")
    const [ year, setYear ] = useState()
    const [ genre, setGenre ] = useState("")
    const [ director, setDirector ] = useState("")
    const [ actor1, setActor1 ] = useState("")
    const [ actor2, setActor2 ] = useState("")

    const [ genres, setGenres ] = useState([])
    const [ confirmDelete, setConfirm ] = useState(false)

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
                    // console.log(res.data)
                }).catch((error) => {
                    console.log(error)
                })
        }

        fetchData()

    }, [router.isReady])

    function saveEdits(){
        try {
            axios.post("/api/movies", {
                id: movie_id,
                name: name,
                year: year,
                genre: genre,
                director: director,
                actor1: actor1,
                actor2: actor2
            }).then((res) => {
                console.log(res.data.message)
                window.location.reload()
            }).catch((error) => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }   

    function deleteEntry(){
        try {
            axios.get(`/api/movies?delete=${true}&movie_id=${movie_id}`)
            .then((res) => {
                console.log(res)
                console.log("Deleted Entry")

                router.push("/")
            }).catch((err) => {
                console.log(err)
            })
            
        } catch (error) {   
            console.log(error)
        }
    }

    return (
        <div className={`flex flex-col w-full min-h-[100vh] h-fit bg-slate-50 pt-10 relative ${montserrat.className}`}>
            <div className="flex w-full h-full bg-slate-200 p-10">

                <div className="absolute w-full h-full top-0 left-0 right-0 mx-auto z-0 opacity-80 pointer-events-none">   
                    <div className="w-full h-full relative select-none">
                        <Image src={"/update_bg.jpg"} alt={""} fill priority />
                    </div>
                </div>
                
                <div className="w-3/4 lg:w-1/2 mx-auto bg-white z-10 bg-opacity-90 rounded-xl p-10 overflow-auto relative">
                    {
                        confirmDelete &&
                        <div className="absolute top-0 right-0 bg-black bg-opacity-50 w-full h-full z-10 pt-36">
                            <div className="bg-white w-3/4 h-fit mx-auto rounded-xl p-5">
                                <div className="flex justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 stroke-red-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                    <p className="text-red-500 my-auto ml-2">Warning</p>
                                    <p className="my-auto">: You are about to delete an entry.</p>
                                </div>
                                
                                <p className="text-center">Are you sure you want to delete movie entry '{name}'?</p>
                                <p className="text-center font-semibold mb-6">This cannot be undone.</p>
                                
                                <div className="flex w-full gap-5">
                                    <button className={`${montserrat.className} mx-auto flex w-full gap-3 sm:w-1/2 md:w-2/5 px-5 py-2 text-[16px] text-white bg-gray-800 hover:brightness-75 ml-auto rounded-[20px] `}
                                        onClick={() => setConfirm(false)}
                                    >
                                        <p className="my-auto w-full text-center">Cancel</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                        </svg>
                                    </button>

                                    <button className={`${montserrat.className} mx-auto flex w-full sm:w-1/2 md:w-2/5 px-5 py-2 text-[16px] text-white bg-red-500 hover:brightness-75 rounded-[20px] `}
                                        onClick={() => deleteEntry()}
                                    >
                                        <p className="my-auto w-full text-left">Confirm Delete</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="flex xl:gap-5 mb-5 opacity-100">
                        <p className="my-auto text-center w-full text-[18px] sm:text-[24px] lg:text-[32px] xl:text-[36px] font-bold">UPDATE AN ENTRY</p>
                        <div className="relative xl:w-[200px] xl:h-[70px] drop-shadow-lg cursor-pointer hover:brightness-95">
                            <Image src={"/sample_logo.png"} alt={""} fill sizes="(max-width: 200px)"/>
                        </div>
                    </div>
                    
                    <form action="" className="flex flex-col xl:text-[20px] opacity-100"
                        onSubmit={(e) => {
                            e.preventDefault() 
                        } }
                    >
                        <label htmlFor="title" className="font-semibold mb-2">Movie Title</label>
                        <input type="text" name="title" id="" className={`${montserrat.className} mb-10 border border-black border-opacity-30 w-full sm:w-2/3 py-2 px-5 shadow-md  rounded-lg text-[16px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}
                            defaultValue={name ? name : ""}
                            placeholder="Enter movie title..." onChange={(e) => setName(e.target.value)}
                        />
                        
                        <div className="flex flex-col gap-0 md:flex-row md:gap-10 mb-5 w-full">
                            <section className="flex flex-col w-1/2">
                                <label htmlFor="title" className="font-semibold mb-2">Year Released</label>
                                <input required type="number" name="year" id="" className={`${montserrat.className} sm:w-3/4 mb-5 border border-black border-opacity-30 py-2 px-5 shadow-md rounded-lg text-[16px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}
                                    placeholder="Year..." onChange={(e) => setYear(e.target.value)} defaultValue={year ? year : null}
                                />
                            </section>
                        </div>
                        
                        <div className="flex flex-col gap-0 md:flex-row md:gap-10 mb-5">
                            <section className="flex flex-col w-full">
                                <label htmlFor="genre" className="font-semibold mb-2">Genre</label>
                                <select required name="genre" id="" className={`${montserrat.className} w-full mb-5 border border-black border-opacity-20 rounded-lg px-2 py-2 shadow-md text-[16px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}
                                    value={genre ? genre : ""}
                                    onChange={(e) => setGenre(e.target.value)}
                                >
                                    <option value="" hidden>Select a genre</option>
                                    {
                                        genres.map((val, index) => {
                                            return (
                                                <option key={index} value={val.genre}>{val.genre}</option>
                                            )
                                        })
                                    }
                                </select>
                            </section>
                            
                            <section className="flex flex-col w-full">
                                <label htmlFor="directors" className="font-semibold mb-2">Movie Director</label>
                                <input required name="directors" id="" className={`${montserrat.className} sm:w-full mb-5 border border-black border-opacity-30 py-2 px-5 shadow-md  rounded-lg text-[16px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}
                                    defaultValue={director ? director : ""}
                                    onChange={(e) => setDirector(e.target.value)} placeholder="Name of director..."
                                />
                            </section>
                        </div>
                        
                        <div className="flex flex-col gap-0 md:flex-row md:gap-10 mb-10">
                            <section className="flex flex-col w-full">
                                <label htmlFor="genre" className="font-semibold mb-2">First Actor</label>
                                <input required name="genre" id="" className={`${montserrat.className} sm:w-full mb-5 border border-black border-opacity-30 py-2 px-5 shadow-md  rounded-lg text-[16px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}
                                    defaultValue={actor1 ? actor1 : null}
                                    onChange={(e) => setActor1(e.target.value)} placeholder="Empty..."
                                />
                            </section>
                            
                            <section className="flex flex-col w-full">
                                <label htmlFor="directors" className="font-semibold mb-2">Second Actor</label>
                                <input required name="genre" id="" className={`${montserrat.className} sm:w-full mb-5 border border-black border-opacity-30 py-2 px-5 shadow-md  rounded-lg text-[16px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}
                                    defaultValue={actor2 ? actor2 : null}
                                    onChange={(e) => setActor2(e.target.value)} placeholder="Empty..."
                                />
                            </section>
                        </div>
                    </form>
                    <div className="flex w-full gap-5">
                        <button className={`${montserrat.className} flex w-full gap-3 sm:w-1/2 md:w-fit px-5 py-2 text-[16px] text-white bg-red-400 hover:brightness-75 ml-auto rounded-[20px] `}
                            onClick={() => setConfirm(true)}
                        >
                            <p className="my-auto w-full text-left">Delete Entry</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>

                        <button className={`${montserrat.className} flex w-full sm:w-1/2 md:w-1/4 px-5 py-2 text-[16px] text-white bg-green-600 hover:brightness-75 rounded-[20px] `}
                            onClick={() => saveEdits()}
                        >
                            <p className="my-auto w-full text-left">Save Edits</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
                            </svg>
                        </button>
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}
