"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react";
import { getToken } from "./actions";

const JwtPage = () => {
    const [jwtToken, setJwtToken] = useState<string | null>(null);

    async function onClick() {
        const token = await getToken();
        console.log('token', token);
        if (token) {    
            setJwtToken(token);
        }
    }
    return <div className="px-4 py-2">
        <h1 className="text-2xl font-bold">Get JWT</h1>
        <p className="text-gray-600">This page is used to get a JWT token for the user.</p>
        <div>
        <Button onClick={onClick} className="mt-4">
            Get JWT
        </Button>

        {jwtToken && (
            <div className="mt-4">
                <h2 className="text-lg font-bold">JWT Token</h2>
                <p className="text-gray-600">{jwtToken}</p>
        </div>)
        }
    </div>
    </div>

}

export default JwtPage;