"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface ProjectViewProps {
  currentProject: any;
}

enum EProjectManagingTabs {
  SCHEDULING = "scheduling",
  DOCS = "docs",
  BOARDS = "boards",
}


const ProjectView = ({ currentProject }: ProjectViewProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentManagingTool, setCurrentManagingTool] = useState<string | null>(
    searchParams.get("managing-tool")
  );

  const ChangeManagingToolQuery = (managingTool: EProjectManagingTabs) => {
    router.push(
      `/home?project=${searchParams.get(
        "project"
      )}&managing-tool=${managingTool}`
    );
  };

  return (
    <section className="bg-black w-[76vw] h-screen select-none flex flex-col items-center justify-start py-4 px-8 gap-6 overflow-y-scroll">
      {/* Path Info */}
      <div className="w-full h-fit">
        <span className="text-white text-lg">
          Your Projects / {currentProject?.name}
        </span>
      </div>

      {/* Header Project Info */}
      <div className="w-full h-[12vh] flex items-center justify-between rounded-2xl bg-foreground border border-primary-border px-3 py-1">
        <div className="flex items-center justify-center gap-2">
          <Image
            src={"/user-icon.png"}
            alt="Project Icon"
            width={45}
            height={45}
          />

          <span className="text-green-500 text-sm">6 Members Active</span>
        </div>

        <div className="h-fit flex items-center justify-center">
          <span className="text-white text-2xl">{currentProject?.name}</span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <button className="text-white hover:text-gray-300 transition-all duration-200 cursor-pointer">
            Export
          </button>
          <button className="text-white hover:text-gray-300 transition-all duration-200 cursor-pointer">
            Share
          </button>
          <Image
            src={"/settings-icon.png"}
            alt={"Project Settings"}
            width={25}
            height={25}
            className="cursor-pointer hover:opacity-90 transition-all duration-300"
          />
        </div>
      </div>

      {/* Banner */}
      <div className="w-full h-[32vh] bg-white rounded-3xl flex items-center justify-center">
        <div className="flex items-center justify-center overflow-hidden rounded-3xl w-full h-full">
          <Image
            src={"/test-banner.png"}
            alt="Project Icon"
            width={1920}
            height={1080}
            className="aspect-auto"
          />
        </div>
      </div>

      {/* Project Info */}
      <div className="w-full h-[40vh] flex items-start justify-start gap-4">
        <div className="bg-white w-fit h-fit rounded-full overflow-hidden">
          <Image
            src={"/test-banner.png"}
            alt="Project Icon"
            width={180}
            height={180}
            className="object-cover aspect-square"
          />
        </div>

        <div className="flex w-fit h-full gap-3 flex-col items-start justify-start">
          <span className="text-white text-[3rem] font-semibold">
            {currentProject?.name}
          </span>

          <p className="w-[37vw] h-[8vh] text-primary-text">
            {currentProject?.description}
          </p>
        </div>
      </div>

      {/* Project Managing Opitons */}
      <div className="w-full h-fit flex items-center justify-start mt-16 gap-4">
        <button
          className={`px-4 py-1 rounded-lg font-medium cursor-pointer ${
            searchParams.get("managing-tool") ===
            EProjectManagingTabs.SCHEDULING
              ? "bg-white text-black"
              : "text-white bg-foreground hover:bg-foreground/80"
          } transition-all duration-300`}
          onClick={() => {
            ChangeManagingToolQuery(EProjectManagingTabs.SCHEDULING);
          }}
        >
          Scheduling
        </button>

        <button
          className={`px-4 py-1 rounded-lg font-medium cursor-pointer ${
            searchParams.get("managing-tool") === EProjectManagingTabs.DOCS
              ? "bg-white text-black"
              : "text-white bg-foreground hover:bg-foreground/80"
          } transition-all duration-300`}
          onClick={() => {
            ChangeManagingToolQuery(EProjectManagingTabs.DOCS);
          }}
        >
          Docs
        </button>

        <button
          className={`px-4 py-1 rounded-lg font-medium cursor-pointer ${
            searchParams.get("managing-tool") === EProjectManagingTabs.BOARDS
              ? "bg-white text-black"
              : "text-white bg-foreground hover:bg-foreground/80"
          } transition-all duration-300`}
          onClick={() => {
            ChangeManagingToolQuery(EProjectManagingTabs.BOARDS);
          }}
        >
          Boards
        </button>
      </div>

      {/* Scheduling */}
      <section className="w-full h-fit flex flex-col items-start justify-start gap-6">
        <select
          className="text-primary-text border border-primary-border bg-foreground px-2 w-44 py-2 rounded-lg outline-none cursor-pointer selection:bg-foreground/90"
        >
          <option value="table">Table</option>
          <option value="kanban">Kanban</option>
          <option value="timeline">Timeline</option>
        </select>

        <div className="w-full h-[80vh]">

        </div>
      </section>
    </section>
  );
};

export default ProjectView;
