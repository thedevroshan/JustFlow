'use client'
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

// API
import { CreateProjectAPI } from '../api/projectAPI'


const CreateProject = ({setCreateProjectDialog}: {setCreateProjectDialog: (value: boolean) => void}) => {
  const [projectName, setProjectName] = useState<string>('')
  const [error, setError] = useState<string>('')

  const {mutateAsync: createProject, isPending} = useMutation({
    mutationFn: CreateProjectAPI,
    onSuccess: (data) => {
      if(!data.ok){
        setError(data.message)
        return
      }
      setCreateProjectDialog(false)
      setProjectName('')
      setError('')
    },
    onError: () => {
      setError('Something went wrong while creating project.')
    }
  })

  const HandleCreateProject = async () => {
    if(projectName.length === 0){
      return
    }
    await createProject(projectName)
  }
  return (
    <div className='bg-black border border-primary-border rounded-xl p-2 w-[30vw] h-fit absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-start gap-4 py-5 px-7 animate-slide-up'>
        <span className='text-white text-xl font-semibold'>Create Project</span>

        <input type="text" placeholder='Project Name' className='bg-foreground text-white border border-primary-border rounded-lg p-2 w-full outline-none' value={projectName} onChange={(e) => setProjectName(e.target.value)} onKeyDown={async (e)=>{
          if(e.key === 'Enter'){
            await HandleCreateProject()
          }
        }}/>

        <div className='flex flex-col items-center justify-between gap-2 w-full'>
          <button className={`${isPending ? 'opacity-50 cursor-not-allowed bg-white/70' : 'hover:bg-white/70 bg-white'} text-black cursor-pointer rounded-lg p-2 w-full transition-all duration-300`} onClick={async () => {
            await HandleCreateProject()
          }}>{isPending ? 'Creating...' : 'Create'}</button>

          <button className='text-white bg-foreground hover:bg-primary-border cursor-pointer rounded-lg p-2 w-full transition-all duration-300' onClick={() => {
            setCreateProjectDialog(false)
            setProjectName('')
          }}>Cancel</button>
        </div>

        {error && <span className='text-red-500 text-sm font-medium'>{error}</span>}
    </div>
  )
}

export default CreateProject