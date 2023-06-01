// pages/users/[id].js
"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

function UserDetail() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Detail</h1>
      <p>ID: {user._id}</p>
      <p>Name: {user.fullName}</p>
      <p>Email: {user.email}</p>
      {/* Render other user details */}
    </div>
  );
}
export default UserDetail;
