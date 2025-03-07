import { create } from 'zustand'

interface ProjectStore {
    yourProjects: any[],
    joinedProjects: any[],
}

interface ProjectStoreActions {
    setYourProjects: (projects: any[]) => void,
    setJoinedProjects: (projects: any[]) => void,
}

const useProjectStore = create<ProjectStore & ProjectStoreActions>((set) => ({
    yourProjects: [],
    joinedProjects: [],
    setYourProjects: (projects: any[]) => set({ yourProjects: projects }),
    setJoinedProjects: (projects: any[]) => set({ joinedProjects: projects }),
}))

export default useProjectStore;
