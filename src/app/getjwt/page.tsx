"use client"
import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs/server"
import { useState } from "react";

const JwtPage = () => {
    const [jwtToken, setJwtToken] = useState<string | null>(null);

    const getToken = async () => {
        const {getToken} = await auth();
        const token = await getToken();
        console.log('token', token);
        setJwtToken(token);
    }
    return <div className="px-4 py-2">
        <h1 className="text-2xl font-bold">Get JWT</h1>
        <p className="text-gray-600">This page is used to get a JWT token for the user.</p>
        <div>
        <Button onClick={getToken}>
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