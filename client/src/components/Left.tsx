"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";


import useStore from ".././store/store";


function Left() {

  const user = useStore((state) => state.user);

  return (
    <aside className="flex flex-col justify-start items-start w-96 h-screen border-r p-4 ">
      <Link href="/">
        <Image
          src="/images/logo_gray.png"
          alt="logo"
          width={360}
          height={360}
          className="mx-auto py-4"
          priority={true}
        />
      </Link>

      <input
        type="search"
        placeholder="Search"
        className="my-2 border border-gray-300"
      />

      <ul className="flex flex-col justify-start items-start w-full mt-2">
        <li className="inline font-bold w-full p-2 my-2 rounded-md hover:bg-slate-400 ">
          <Link href="/" >
            <Image
              src="/icons/home-icon.png"
              alt="logo"
              width={20}
              height={20}
              className=" inline-block mr-2"
            />
            Home
          </Link>
        </li>

        <li className="font-bold w-full p-2 my-2 rounded-md hover:bg-slate-400">
          <Link href="/projects">
            <Image
              src="/icons/projects-icon.png"
              alt="logo"
              width={20}
              height={20}
              className=" inline-block mr-2"
            />
            Projects
          </Link>
        </li>

        <li className="font-bold w-full p-2 my-2 rounded-md hover:bg-slate-400">
          <Link href="/tasks">
            <Image
              src="/icons/tasks-icon.png"
              alt="logo"
              width={20}
              height={20}
              className=" inline-block mr-2"
            />
            Tasks
          </Link>
        </li>

        <li className="font-bold w-full p-2 my-2 rounded-md hover:bg-slate-400">
          <Link href="/users">
            <Image
              src="/icons/users-icon.png"
              alt="logo"
              width={20}
              height={20}
              className=" inline-block mr-2"
            />
            Users
          </Link>
        </li>
      </ul>

      
        <ul className="flex flex-col justify-start items-start w-full mt-auto">
          <li className="font-bold w-full p-2 my-2 rounded-md hover:bg-slate-400">
            <Link href="/support">
              <Image
                src="/icons/support-icon.png"
                alt="logo"
                width={20}
                height={20}
                className=" inline-block mr-2"
              />
              Support
            </Link>
          </li>

          <li className="font-bold w-full p-2 my-2 rounded-md hover:bg-slate-400">
            <Link href="/settings">
              <Image
                src="/icons/settings-icon.png"
                alt="logo"
                width={20}
                height={20}
                className=" inline-block mr-2"
              />
              Settings
            </Link>
          </li>
        </ul>

        <div className="flex flex-row">
          <div>
            <h2 className="  font-bold text-gray-400">{user.fullName}</h2>
            <p className=" text-sm text-gray-400">{user.email}</p>
          </div>

          <div className="flex items-center justify-center">
            <Link href="/login">
              <Image
                src="/icons/logout-icon.png"
                alt="logo"
                width={20}
                height={20}
                className="inline-block ms-24 mr-4"
              />
            </Link>
          </div>
        </div>
      
    </aside>
  );
}

export default Left;
