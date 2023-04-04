import Head from "next/head";
import { Inter } from "next/font/google";
import MoviesTable from "@/components/MoviesTable/MoviesTable";
import SearchMovie from "@/components/SearchMovie/SearchMovie";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main className="pt-16">
        <SearchMovie />
        <MoviesTable />
      </main>
    </>
  );
}
