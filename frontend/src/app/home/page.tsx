'use client'
import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'


// Components
import ProjectListElement from '../components/ProjectListElement'


// Dialog
import CreateProject from '../dialog/CreateProject'


enum EnumProjectTabs {
  YOURPROJECTS,
  JOINEDPROJECTS
}

const HomePage = () => {
  const [selectedProjectTab, setSelectedProjectTab] = useState<EnumProjectTabs>(EnumProjectTabs.YOURPROJECTS)
  const [createProjectDialog, setCreateProjectDialog] = useState<boolean>(false)
  

  return (
    <>
    <section className='bg-black flex flex-col items-center justify-start gap-4 py-2 border-r border-primary-border w-[20vw] h-[100vh] select-none'>
      <div className='flex flex-col items-start justify-center gap-2 w-full h-[25vh] px-2 py-1'>
        <strong className='text-white text-3xl'>NexFlow</strong>

        <input type="text" placeholder='Search...' className='w-full py-1 rounded-md bg-foreground px-2 text-white border border-primary-border outline-none' />

        <button className='w-full py-1 rounded-md bg-foreground px-2 text-white border border-primary-border outline-none cursor-pointer hover:bg-primary-border transition-all duration-300' onClick={() => setCreateProjectDialog(true)}>New Project</button>

        <div className='flex items-center justify-start gap-2 w-full h-fit'>
          <button className={`text-sm font-medium px-4 py-1 rounded-md cursor-pointer transition-all duration-300 outline-none ${selectedProjectTab === EnumProjectTabs.YOURPROJECTS ? 'bg-white text-black' : 'bg-primary-border text-white hover:bg-primary-border/50'}`} onClick={() => setSelectedProjectTab(EnumProjectTabs.YOURPROJECTS)}>Your Projects</button>

          <button className={`text-sm font-medium  px-4 py-1 rounded-md cursor-pointer transition-all duration-300 outli ${selectedProjectTab === EnumProjectTabs.JOINEDPROJECTS ? 'bg-white text-black' : 'hover:bg-primary-border/50 bg-primary-border text-white'}`} onClick={() => setSelectedProjectTab(EnumProjectTabs.JOINEDPROJECTS)}>Joined Projects</button>
        </div>
      </div>

      {/* Your Projects List */}
      {selectedProjectTab === EnumProjectTabs.YOURPROJECTS && <section className='flex flex-col items-start justify-start gap-2 w-full h-[75vh] overflow-y-auto px-2 py-1'>
        <span className='text-primary-text text-lg font-semibold'>Your Projects</span>

          <ProjectListElement />
          <ProjectListElement />
          <ProjectListElement />
          <ProjectListElement />
          <ProjectListElement />
          <ProjectListElement />
          <ProjectListElement />
          <ProjectListElement />
          <ProjectListElement />
          <ProjectListElement />
          <ProjectListElement />
      </section>}

      {/* Joined Projects List */}
      {selectedProjectTab === EnumProjectTabs.JOINEDPROJECTS && <section className='flex flex-col items-start justify-start gap-2 w-full h-[75vh] overflow-y-auto px-2 py-1'>
        <span className='text-primary-text text-lg font-semibold'>Joined Projects</span>

          <ProjectListElement />
          <ProjectListElement />
          <ProjectListElement />
          <ProjectListElement />
          <ProjectListElement />
          <ProjectListElement />
          <ProjectListElement />
          <ProjectListElement />
          <ProjectListElement />
          <ProjectListElement />
          <ProjectListElement />
      </section>}

    </section>
    <section className='bg-black w-[76vw] h-[100vh] select-none'>
      {createProjectDialog && <CreateProject setCreateProjectDialog={setCreateProjectDialog}/>}
    </section>
    </>
  )
}

export default HomePage