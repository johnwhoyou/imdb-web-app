import React, { useEffect, useState } from "react";
import axios from "axios";

import SearchMovie from "@/components/SearchMovie/SearchMovie";
import { useRouter } from "next/router";

const MoviesTable = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [ selected, setSelected ] = useState()

  const rowsPerPage = 10;

  const router = useRouter()

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `/api/movies?page=${currentPage}&limit=${rowsPerPage}&search=${searchQuery}`
        );
        setMovies(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [currentPage, searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset the current page to 1 when the search query changes
  };

  return (
    <>
      <SearchMovie onSearchChange={handleSearchChange} />
      <div className="container max-w-5xl px-4 mx-auto sm:px-8">
        <div className="py-8">
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-semibold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      TITLE
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-semibold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      YEAR
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-semibold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      GENRE
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-semibold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      DIRECTOR
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-semibold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      ACTOR&nbsp;1
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-semibold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      ACTOR&nbsp;2
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {console.log(movies)}
                  {movies &&
                    movies.map((movie, index) => (
                      <tr key={movie.id} className="relative">
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {movie.name ? movie.name : "N/D"}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {movie.year}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {movie.genre ? movie.genre : "N/D"}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {movie.director ? movie.director : "N/D"}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {movie.actor1 ? movie.actor1 : "N/D"}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {movie.actor2 ? movie.actor2 : "N/D"}
                          </p>
                        </td>
                        <td className="w-auto h-auto border-y border-gray-200 pr-5">
                          <svg className="w-4 h-4 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                            onClick={() => {
                              setSelected(index)
                            }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                        </td>
                        {
                          selected === index &&
                          <td className="flex flex-col absolute z-0 bg-white border border-gray-200 w-20 h-fit shadow-md top-0 right-2 bottom-0 my-auto text-center">
                            <p className="text-[12px] border-b border-gray-200 hover:brightness-90 bg-white cursor-pointer"
                              onClick={() => {
                                router.push(`/update/${movie.id}`)
                              }}
                            >Edit</p>

                            <p className="text-[12px] border-b border-gray-200 hover:brightness-90 bg-white cursor-pointer"
                              onClick={() => {
                                router.push(`/view/${movie.id}`)
                              }}
                            >View</p>

                            <p className="text-[12px] hover:brightness-90 bg-white text-red-400 cursor-pointer" 
                              onClick={() => {
                                setSelected(null)
                              }}
                            >Cancel</p>
                          </td>
                        }
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100"
                    onClick={() => {
                      handlePageChange(currentPage - 1)
                      setSelected(null)
                    }}
                    disabled={currentPage === 1}
                  >
                    <svg
                      width="9"
                      fill="currentColor"
                      height="8"
                      className=""
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-base text-blue-700 bg-white border"
                  >
                    {currentPage}
                  </button>
                  <button
                    type="button"
                    className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100"
                    onClick={() => {
                      handlePageChange(currentPage + 1)
                      setSelected(null)
                    }}
                    disabled={currentPage === totalPages}
                  >
                    <svg
                      width="9"
                      fill="currentColor"
                      height="8"
                      className=""
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesTable;
