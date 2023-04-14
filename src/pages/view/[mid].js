
import View_Entry from "@/components/View Entry/view";
import { useRouter } from "next/router";
import React from "react";

export default function View_Movie(){

    const router = useRouter()

    const { mid } = router.query

    return (
        <View_Entry  movie_id={mid}/>
    )
}