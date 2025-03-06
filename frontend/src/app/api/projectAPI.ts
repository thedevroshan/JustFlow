export const CreateProjectAPI = async (projectName: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: projectName})
    })
    return await response.json()
}

