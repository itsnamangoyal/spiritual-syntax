import React from "react";
import UserCard from "./userCard";

const AllUsers = ({ users, updateUsers, userDeleteHandler }) => {
  const usersEntries = Object.entries(users);
  // console.log(usersEntries);
  return (
    <div className="all-users" style={{ margin: "2rem auto" }}>
      <h5 style={{ textAlign: "center" }}>
        {usersEntries.length === 0 ? "No Users" : "Users"}
      </h5>
      {usersEntries.map((userEntry) => (
        <UserCard
          key={userEntry[0]}
          objectName={userEntry[0]}
          user={userEntry[1]}
          userDeleteHandler={userDeleteHandler}
        />
      ))}
    </div>
  );
};

export default AllUsers;
