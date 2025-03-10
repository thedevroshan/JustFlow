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

export const ChangeScheduleViewStyleAPI = async ({projectId, viewStyle}:{projectId:string, viewStyle:string}) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${projectId}/schedule-view-style?view=${viewStyle}`, {
        method: 'PUT',
        credentials: 'include',
    })
    return await response.json()
}


export const GetScheduleViewStyleAPI = async ({projectId}:{projectId:string}) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${projectId}/schedule-view-style`, {
        method: 'GET',
        credentials: 'include',
    })
    return await response.json()
}

export const GetAllProjectsAPI = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/`, {
        method: 'GET',
        credentials: 'include',
    })
    return await response.json()
}

