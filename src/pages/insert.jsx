
import { Montserrat } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import Movie from "../lib/models/Movie";

const montserrat = Montserrat({
    subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
    style: ['normal', 'italic']
})

export default function Insert(){

    const [ name, setName ] = useState("")
    const [ year, setYear ] = useState(2000)
    const [ rank, setRank ] = useState(0)
    const [ genre, setGenre ] = useState("")
    const [ director, setDirector ] = useState("")
    const [ actor1, setActor1 ] = useState("")
    const [ actor2, setActor2 ] = useState("")

    const [genres, setGenres] = useState([])

    useEffect(() => {

        const fetchGenres = () => {
            try {
                axios.get(`/api/movies?options=${true}`).then((res) => {
                    
                    setGenres(res.data.genres_arr)

                }).catch((err) => {
                    console.log(err)
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchGenres()
    }, [])

    function handleSubmit(){

        const data = {
            name: name,
            year: year,
            genre: genre,
            director: director,
            actor1: actor1,
            actor2: actor2
        }

        axios.post("/api/movies", data)
        .then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
        
    }

    return (
        <div className={`flex flex-col w-full min-h-[100vh] h-auto bg-slate-50 pt-10 relative ${montserrat.className}`}>
            <div className="flex w-full h-full bg-slate-200 p-10">

                <div className="absolute w-full h-full top-0 left-0 right-0 mx-auto z-0 opacity-80 pointer-events-none">   
                    <div className="w-full h-full relative select-none">
                        <Image src={"/insert_bg.jpg"} alt={""} fill />
                    </div>
                </div>
                
                <div className="w-3/4 lg:w-1/2 mx-auto bg-white z-10 bg-opacity-90 rounded-xl p-10 overflow-auto">
                    <div className="flex xl:gap-5 mb-5 opacity-100">
                        <p className="my-auto text-center w-full text-[18px] sm:text-[24px] lg:text-[32px] xl:text-[36px] font-bold">ADD A MOVIE ENTRY</p>
                        <div className="relative xl:w-[200px] xl:h-[70px] drop-shadow-lg cursor-pointer hover:brightness-95">
                            <Image src={"/sample_logo.png"} alt={""} fill />
                        </div>
                    </div>
                    
                    <form action="" className="flex flex-col xl:text-[20px] opacity-100"
                        onSubmit={(e) => {
                            e.preventDefault() 
                            handleSubmit()
                        } }
                    >
                        <label htmlFor="title" className="font-semibold mb-2">Movie Title</label>
                        <input type="text" name="title" id="" className={`${montserrat.className} mb-10 border border-black border-opacity-30 w-full sm:w-2/3 py-2 px-5 shadow-md  rounded-lg text-[16px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}
                            placeholder="Enter movie title..." onChange={(e) => setName(e.target.value)}
                        />
                        
                        <div className="flex flex-col gap-0 md:flex-row md:gap-10 mb-5 w-full">
                            <section className="flex flex-col w-1/2">
                                <label htmlFor="title" className="font-semibold mb-2">Year Released</label>
                                <input required type="number" name="year" id="" className={`${montserrat.className} sm:w-3/4 mb-5 border border-black border-opacity-30 py-2 px-5 shadow-md rounded-lg text-[16px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}
                                    placeholder="Year..." onChange={(e) => setYear(e.target.value)} defaultValue={2000}
                                />
                            </section>
                        </div>
                        
                        <div className="flex flex-col gap-0 md:flex-row md:gap-10 mb-5">
                            <section className="flex flex-col w-full">
                                <label htmlFor="genre" className="font-semibold mb-2">Genre</label>
                                <select required name="genre" id="" className={`${montserrat.className} w-full mb-5 border border-black border-opacity-20 rounded-lg px-2 py-2 shadow-md text-[16px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}
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
                                    onChange={(e) => setDirector(e.target.value)} placeholder="Name of director..."
                                />
                            </section>
                        </div>
                        
                        <div className="flex flex-col gap-0 md:flex-row md:gap-10 mb-10">
                            <section className="flex flex-col w-full">
                                <label htmlFor="genre" className="font-semibold mb-2">First Actor</label>
                                <input required name="genre" id="" className={`${montserrat.className} sm:w-full mb-5 border border-black border-opacity-30 py-2 px-5 shadow-md  rounded-lg text-[16px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}
                                    onChange={(e) => setActor1(e.target.value)} placeholder="Name of first actor..."
                                />
                            </section>
                            
                            <section className="flex flex-col w-full">
                                <label htmlFor="directors" className="font-semibold mb-2">Second Actor</label>
                                <input required name="genre" id="" className={`${montserrat.className} sm:w-full mb-5 border border-black border-opacity-30 py-2 px-5 shadow-md  rounded-lg text-[16px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}
                                    onChange={(e) => setActor2(e.target.value)} placeholder="Name of second actor..."
                                />
                            </section>
                        </div>

                        <button className="w-full sm:w-1/2 md:w-1/4 px-5 py-2 border border-black border-opacity-30 text-[16px] text-white bg-blue-500 hover:brightness-75 ml-auto rounded-xl ">Insert Movie</button>
                    </form>
                </div>
                
            </div>
        </div>
    )
}