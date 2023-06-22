"use client"
import React, {useEffect} from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Home({ session }) {

  const router = useRouter();
  useEffect(() => {
    if(typeof window !== 'undefined' && !session) {
      router.replace('/login');
    }
  }, [session, router]);

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      {session && <p>User: {session.user.email}</p>}
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