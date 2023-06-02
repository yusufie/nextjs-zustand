// pages/users/[id].js
"use client";
import Left from "../../../components/Left";
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

  const handleChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div id="updatePage">
      <Left />

      <div id="updateContainer">
        <h1 id="updateFormHeader">Update User</h1>
        <div id="updateForm">
          <div className="form-row">
            <label>Name:</label>
            <input
              type="text"
              value={user.fullName}
              name="fullName"
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Email:</label>
            <input
              type="text"
              value={user.email}
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Phone:</label>
            <input
              type="text"
              value={user.phone}
              name="phone"
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Role:</label>
            <input
              type="option"
              value={user.role}
              name="role"
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Active:</label>
            <input
              type="checkbox"
              checked={user.active}
              name="active"
              onChange={handleChange}
            />
          </div>
        </div>
        <div id="updateButtonContainer">
          <button>Update User</button>
        </div>
      </div>
    </div>
  );
}
export default UserDetail;
