"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";


// Components
import ProjectListElement from "../components/ProjectListElement";
import ProjectView from "../components/ProjectView";

// Dialog
import CreateProject from "../dialog/CreateProject";

// API
import { GetAllProjectsAPI } from "../api/projectAPI";

// Stores
import useProjectStore from "../stores/ProjectStore";
import Link from "next/link";

enum EProjectTabs {
  YOURPROJECTS,
  JOINEDPROJECTS,
}

const HomePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // States
  const [selectedProjectTab, setSelectedProjectTab] = useState<EProjectTabs>(
    EProjectTabs.YOURPROJECTS
  );
  const [createProjectDialog, setCreateProjectDialog] =
    useState<boolean>(false);
  const [activeProject, setActiveProject] = useState<string | null>(
    searchParams.get("project")
  );

  // Stores Actions
  const { setYourProjects, setJoinedProjects } = useProjectStore();

  // Stores
  const { yourProjects, joinedProjects } = useProjectStore();

  const { data: allProjects, isLoading: isLoadingAllProjects } = useQuery({
    queryKey: ["allProjects"],
    queryFn: () => GetAllProjectsAPI(),
  });

  useEffect(() => {
    if (allProjects) {
      if (activeProject == null) {
        setActiveProject(allProjects.projects[0]._id);
        router.push(`/home?project=${allProjects.projects[0]._id}&managing-tool=scheduling`);
      }
      setYourProjects(allProjects.projects);
      setJoinedProjects(allProjects.joinedProjects);
    }
  }, [allProjects]);

  useEffect(() => {
    if (searchParams.get("project") != activeProject) {
      setActiveProject(searchParams.get("project") as string);
    }
  }, [searchParams.get("project")]);

  return (
    <>
      {/* Side Menu Bar */}
      <section className="bg-black flex flex-col items-center justify-start gap-4 py-2 border-r border-primary-border w-[20vw] h-[100vh] select-none">
        <div className="flex flex-col items-start justify-center gap-2 w-full h-[25vh] px-2 py-1">
          <strong className="text-white text-3xl">NexFlow</strong>

          <input
            type="text"
            placeholder="Search..."
            className="w-full py-1 rounded-md bg-foreground px-2 text-white border border-primary-border outline-none"
          />

          <button
            className="w-full py-1 rounded-md bg-foreground px-2 text-white border border-primary-border outline-none cursor-pointer hover:bg-primary-border transition-all duration-300"
            onClick={() => setCreateProjectDialog(true)}
          >
            New Project
          </button>

          <div className="flex items-center justify-start gap-2 w-full h-fit">
            <button
              className={`text-sm font-medium px-4 py-1 rounded-md cursor-pointer transition-all duration-300 outline-none ${
                selectedProjectTab === EProjectTabs.YOURPROJECTS
                  ? "bg-white text-black"
                  : "bg-primary-border text-white hover:bg-primary-border/50"
              }`}
              onClick={() => setSelectedProjectTab(EProjectTabs.YOURPROJECTS)}
            >
              Your Projects
            </button>

            <button
              className={`text-sm font-medium  px-4 py-1 rounded-md cursor-pointer transition-all duration-300 outline-none ${
                selectedProjectTab === EProjectTabs.JOINEDPROJECTS
                  ? "bg-white text-black"
                  : "hover:bg-primary-border/50 bg-primary-border text-white"
              }`}
              onClick={() => setSelectedProjectTab(EProjectTabs.JOINEDPROJECTS)}
            >
              Joined Projects
            </button>
          </div>
        </div>

        {/* Your Projects List */}
        {selectedProjectTab === EProjectTabs.YOURPROJECTS && (
          <section className="flex flex-col items-start justify-start gap-2 w-full h-[75vh] overflow-y-auto px-2 py-1">
            <span className="text-primary-text text-lg font-semibold">
              Your Projects
            </span>

            {isLoadingAllProjects && (
              <span className="text-primary-text text-lg font-medium">
                Fetching Projects...
              </span>
            )}

            {yourProjects &&
              yourProjects.map((project: any) => (
                <Link
                  href={`/home?project=${project._id}&managing-tool=scheduling`}
                  key={project._id}
                  className="w-full"
                >
                  <ProjectListElement
                    project={project}
                    activeProject={activeProject}
                  />
                </Link>
              ))}
          </section>
        )}

        {/* Joined Projects List */}
        {selectedProjectTab === EProjectTabs.JOINEDPROJECTS && (
          <section className="flex flex-col items-start justify-start gap-2 w-full h-[75vh] overflow-y-auto px-2 py-1">
            <span className="text-primary-text text-lg font-semibold">
              Joined Projects
            </span>

            {isLoadingAllProjects && (
              <span className="text-primary-text text-lg font-medium">
                Fetching Projects...
              </span>
            )}

            {joinedProjects &&
              joinedProjects.map((project: any) => (
                <Link
                  href={`/home?project=${project._id}&managing-tool=scheduliing`}
                  key={project._id}
                  className="w-full"
                >
                  <ProjectListElement
                    project={project}
                    activeProject={activeProject}
                  />
                </Link>
              ))}
          </section>
        )}
      </section>

      {createProjectDialog && (
        <div className="bg-black/60 animate-fade-in absolute w-screen h-screen flex items-center justify-center transition-all duration-300">
          <CreateProject setCreateProjectDialog={setCreateProjectDialog} />
        </div>
      )}

      <ProjectView currentProject={yourProjects?.find(project => project._id == activeProject)}/>
    </>
  );
};

export default HomePage;
