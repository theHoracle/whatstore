import { auth } from "@clerk/nextjs/server";

export const getToken = async () => {
    const {getToken} = await auth();
    const token = await getToken();
    console.log('token', token);
    return token; 
}
