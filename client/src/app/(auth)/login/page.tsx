"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import '../../globals.css'

import useStore from "../../../store/store";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useRouter } from "next/navigation";

import { getSession } from 'next-auth/react';

function Login( { session } ) {

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(20).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const setUser = useStore((state) => state.setUser);
  const navigate = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.status === 200) {
        console.log("User login successful");


      // Retrieve the user session data from the API response
      const userSession = await response.json();

      // Save the session information in local storage
      localStorage.setItem("session", JSON.stringify(userSession));

        setUser({ fullName: data.fullName, email: data.email }); // Update the user state
        navigate.push("/users"); // Navigate to the dashboard page
      } else {
        console.log("User login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };


  if (session) {
    // If the user is already authenticated, redirect to a protected page
    navigate.push("/users");
    return null;
  }


  return (

    <div id="loginContainer">

      <Image
        src="/images/logo_gray.png"
        alt="logo"
        width={200}
        height={200}
      />

      <h1>Login in to your account</h1>
      <p>Welcome back! Please enter your details.</p>

      <form onSubmit={handleSubmit(onSubmit)} id="loginForm">

      <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        <p>{errors.email?.message}</p>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>

        <Link href="#" className="my-4 text-blue-600"><span>Forgot your password ?</span></Link>

        <button type="submit" className="">Sign in</button>
      </form>

      
      <span className="my-8">
        Don&apos;t have an account? <Link href="/register" className="text-blue-600">Sign up</Link>
      </span>

    </div>

  )
}

export default Login


export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}