import React from "react";
import Update_entry from "@/components/Update Entry/update";
import { useRouter } from "next/router";

export default function Update_Entry(){

    const router = useRouter()
    
    const { mid } = router.query

    return (
        <Update_entry movie_id={mid} />
    )
}