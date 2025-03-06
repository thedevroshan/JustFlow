export const LoginAPI =  async ({email, password}:{email: string, password: string}) => {
    const resposne = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login?email=${email}&password=${password}`, {
        method: "GET",
        credentials: 'include'
    });
    return await resposne.json();
}

export const SignUpAPI =  async ({name,email, password}:{name:string,email: string, password: string}) => {
    const resposne = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email,password})
    });
    return await resposne.json();   
}