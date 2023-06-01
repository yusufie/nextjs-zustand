"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "../globals.css";
import Left from "../../components/Left";

import Link from "next/link";
import { useRouter } from "next/navigation";

function Users() {
  const [users, setUsers] = useState([]);

  const router = useRouter();

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);


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
  const paginate = (pageNumber:any) => setCurrentPage(pageNumber);

  return (
    <div id="usersPage">
      <Left />

      <div id="usersContainer">
        <h1 id="usersHeader">Users</h1>

        <div id="usersNav">
          <div id="usersSearch">
            <input
              type="text"
              id="usersSearchInput"
              placeholder="Search User"
            />
          </div>

          <div id="userFilter">
            <button id="usersFilterButton">Filter</button>
          </div>
        </div>

        <div id="usersList" className="w-full">
          <table id="usersTable" className="w-full">
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>PHONE</th>
                <th>ROLE</th>
                <th>ACTIVE</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {currentRows.map((user: any) => (
                <Link key={user._id} href={`/users/${user._id}`} passHref={true} >
                <tr onClick={() => navigateToUserDetails(user._id)}>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td id="activeCircle">
                    {user.status === "active" ? (
                      <Image src="/icons/circle-green-icon.png" alt="circle-green" width={16} height={16} /> ) : (
                      <Image src="/icons/circle-red-icon.png" alt="circle-red" width={16} height={16} />
                      )}
                  </td>
                  <td>
                    <Image src="/icons/trash-icon.svg" alt="trash" width={20} height={20} />
                  </td>
                </tr>
                </Link>
              ))}
            </tbody>
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
              width={20}
              height={20}
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
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Users;
