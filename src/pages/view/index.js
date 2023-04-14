
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function View(){

    const router = useRouter()

    useEffect(() => {
        router.push("/search")
    })

    return null
}