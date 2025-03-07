import React from 'react'
import Image from 'next/image'

interface ProjectListElementProps {
    project: any
    activeProject: string | null
}

const ProjectListElement = ({project, activeProject}: ProjectListElementProps) => {
  return (
    <div className={`flex items-center justify-start gap-2 w-full h-fit px-2 py-1 rounded-lg cursor-pointer ${activeProject === project._id ? 'bg-foreground' : 'hover:bg-foreground/50'} transition-all duration-300`}>
        <Image
            src={project?.projectIcon?project?.projectIcon: "/user-icon.png"}
            alt="Project List Element"
            width={42}
            height={42}
        />
        <span className='text-white text-lg font-medium'>{project?.name}</span>
    </div>
  )
}

export default ProjectListElement