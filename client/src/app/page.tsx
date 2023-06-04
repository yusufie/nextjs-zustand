"use client"
import React from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Home({ session }) {
  const router = useRouter();

  if (!session) {
    router.replace('/login');
    return null;
  }

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>User: {session.user.email}</p>
      <button onClick={() => router.replace("/logout")}>Logout</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default Home;