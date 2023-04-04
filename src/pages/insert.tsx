
import { Montserrat } from "next/font/google";
import Image from "next/image";
import React from "react";


const montserrat = Montserrat({
    subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
    style: ['normal', 'italic']
})

export default function Insert(){

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
                        onClick={(e) => {
                            e.preventDefault()

                        }}
                    >
                        
                        <label htmlFor="title" className="font-semibold mb-2">Movie Title</label>
                        <input type="text" name="title" id="" className={`${montserrat.className} mb-10 border border-black border-opacity-30 w-full sm:w-2/3 py-2 px-5 rounded-lg text-[16px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}
                            placeholder="Enter movie title..."
                        />
                        
                        <div className="flex flex-col gap-0 md:flex-row md:gap-10 mb-5">
                            <section className="flex flex-col w-full">
                                <label htmlFor="title" className="font-semibold mb-2">Year Released</label>
                                <input type="number" name="year" id="" className={`${montserrat.className} sm:w-3/4 mb-5 border border-black border-opacity-30 py-2 px-5 rounded-lg text-[16px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}
                                    placeholder="Year..."
                                />
                            </section>
                            
                            <section className="flex flex-col w-full">
                                <label htmlFor="rank" className="font-semibold mb-2">Ranking</label>
                                <input type="number" name="rank" id="" className={`${montserrat.className} sm:w-3/4 mb-5 border border-black border-opacity-30 py-2 px-5 rounded-lg text-[16px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}
                                    placeholder="Rank..."
                                />
                            </section>
                        </div>
                        
                        <div className="flex flex-col gap-0 md:flex-row md:gap-10 mb-5">
                            <section className="flex flex-col w-full">
                                <label htmlFor="genre" className="font-semibold mb-2">Genre</label>
                                <select name="genre" id="" className={`${montserrat.className} w-full mb-5 border border-black border-opacity-20 rounded-lg px-2 py-1 shadow-md text-[14px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}>
                                    <option value="" disabled hidden>Select a genre</option>
                                    <option value="">Genre 1</option>
                                    <option value="">Genre 2</option>
                                </select>
                            </section>
                            
                            <section className="flex flex-col w-full">
                                <label htmlFor="directors" className="font-semibold mb-2">Movie Director</label>
                                <select name="directors" id="" className={`${montserrat.className} w-full mb-5 border border-black border-opacity-20 rounded-lg px-2 py-1 shadow-md text-[14px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}>
                                    <option value="" disabled hidden>Select a director</option>
                                    <option value="">Director 1</option>
                                    <option value="">Director 2</option>
                                </select>
                            </section>
                        </div>
                        
                        <div className="flex flex-col gap-0 md:flex-row md:gap-10 mb-10">
                            <section className="flex flex-col w-full">
                                <label htmlFor="genre" className="font-semibold mb-2">First Actor</label>
                                <select name="genre" id="" className={`${montserrat.className} w-full mb-5 border border-black border-opacity-20 rounded-lg px-2 py-1 shadow-md text-[14px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}>
                                    <option value="" disabled hidden>Select an actor</option>
                                    <option value="">Actor 1</option>
                                    <option value="">Actor 2</option>
                                </select>
                            </section>
                            
                            <section className="flex flex-col w-full">
                                <label htmlFor="directors" className="font-semibold mb-2">Second Actor</label>
                                <select name="directors" id="" className={`${montserrat.className} w-full mb-5 border border-black border-opacity-20 rounded-lg px-2 py-1 shadow-md text-[14px] hover:transition hover:border-opacity-80 duration-500 focus:outline-gray-500`}>
                                    <option value="" disabled hidden>Select an actor</option>
                                    <option value="">Actor 1</option>
                                    <option value="">Actor 2</option>
                                </select>
                            </section>
                        </div>

                        <button className="w-full sm:w-1/2 md:w-1/4 px-5 py-2 border border-black border-opacity-30 text-[16px] text-white bg-blue-500 hover:brightness-75 ml-auto rounded-xl ">Insert Movie</button>
                    </form>
                </div>
                
            </div>
        </div>
    )
}