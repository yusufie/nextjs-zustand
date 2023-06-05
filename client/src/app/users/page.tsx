"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "../globals.css";
import Left from "../../components/Left";

import Link from "next/link";
import { useRouter } from "next/navigation";

function Users() {
  const [users, setUsers] = useState([]);

  const [showModal, setShowModal] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);


  const router = useRouter();

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmDeleteUser = async () => {
    try {
      // Perform the delete operation
      await deleteUser(selectedUser._id);
      setShowModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const cancelDeleteUser = () => {
    setShowModal(false);
    setSelectedUser(null);
  };
  
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        // User deleted successfully
        alert("User deleted successfully");
        
        // update the user list
        const updatedUsers = users.filter((user) => user._id !== userId);
        setUsers(updatedUsers);
      } else {
        console.error("Error deleting user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const navigateToUserDetails = (userId) => {
    router.push(`/users/${userId}`);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Calculate the index range of the rows to display on the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = users.slice(indexOfFirstRow, indexOfLastRow);

  // Calculate the total number of pages
  const totalPages = Math.ceil(users.length / rowsPerPage);

  // Generate an array of page numbers
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // Handle page navigation
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return (
    <div id="usersPage">
      <Left />

      <div id="usersContainer" className=" bg-gray-100">
        <h1 id="usersHeader" className=" font-bold text-gray-600">Users</h1>

        <div id="usersNav">
          <div id="usersSearch">
            <input
              type="text"
              id="usersSearchInput"
              placeholder="Search User"
            />
          </div>

          <div id="userFilter" className="flex flex-row">
            <button
              id="usersFilterButton"
              className="inline items-center justify-center"
            >
              <Image
                src="/icons/filter-icon.png"
                alt="trash"
                width={24}
                height={24}
                className="inline-block mr-2"
              />
              <p className="inline-block text-gray-600 font-bold">Filter</p>
            </button>
          </div>
        </div>

        <div id="usersList" className="flex flex-row">
          <table id="usersTable" className="w-full">
            <thead>
              <tr className=" text-gray-600 bg-gray-300">
                <th>NAME</th>
                <th>EMAIL</th>
                <th>PHONE</th>
                <th>ROLE</th>
                <th>ACTIVE</th>
              </tr>
            </thead>
            <tbody className="">
              {currentRows.map((user: any) => (
                <tr
                  key={user._id}
                  onClick={() => navigateToUserDetails(user._id)}
                >
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td id="activeCircle">
                    {user.status === "active" ? (
                      <Image
                        src="/icons/circle-green-icon.png"
                        alt="circle-green"
                        width={16}
                        height={16}
                      />
                    ) : (
                      <Image
                        src="/icons/circle-red-icon.png"
                        alt="circle-red"
                        width={16}
                        height={16}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <table id="usersTable" className="">
            <thead>
              <tr className="bg-gray-300">
                <th className="text-gray-300 bg-gray-300">DELETE</th>
              </tr>
            </thead>

            <tbody>
              {currentRows.map((user: any) => (
                <tr key={user._id}>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      style={{ zIndex: 99 }}
                    >
                      <Image
                        src="/icons/trash-icon.svg"
                        alt="trash"
                        width={20}
                        height={20}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            {showModal && (
          <div id="confirmUpdateModal">
            <div id="confirmUpdateContent">
              <h3>Confirm Changes</h3>
              <p>Are you sure you want to delete the user?</p>
              <div className="confirmButtonContainer">
                <button
                  onClick={confirmDeleteUser}
                  className="confirmButton confirmButtonYes"
                >
                  Yes
                </button>
                <button
                  onClick={cancelDeleteUser}
                  className="confirmButton confirmButtonNo"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

          </table>
        </div>

        <div id="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Image
              src="/icons/left-arrow-icon.svg"
              alt="left-arrow"
              width={16}
              height={16}
            />
          </button>

          {currentPage > 1 && (
            <>
              {currentPage > 3 && <button disabled>1</button>}
              <button onClick={() => paginate(1)}>...</button>
            </>
          )}

          {pageNumbers
            .slice(currentPage - 1, currentPage + 12)
            .map((pageNumber) => {
              if (pageNumber <= totalPages) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={currentPage === pageNumber ? "active" : ""}
                  >
                    {pageNumber}
                  </button>
                );
              }
              return null;
            })}

          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 12 && <button disabled>...</button>}
            </>
          )}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <Image
              src="/icons/right-arrow-icon.svg"
              alt="right-arrow"
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Users;
