import { useRouter } from "next/router";
import { useEffect } from "react";
import { Inter } from "next/font/google";
import MoviesTable from "@/components/MoviesTable/MoviesTable";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  // Search Movie will be our index page
  useEffect(() => {
    router.push("/search");
  });

  return null;
}
