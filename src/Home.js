import React from "react";
import AllUsers from "./allUsers";
import NewUserForm from "./newUserForm";

const Home = ({ onNewUserFormSubmitHandler, userDeleteHandler, users }) => {
  return (
    <div className="container" style={{ padding: "2rem" }}>
      <NewUserForm onNewUserFormSubmitHandler={onNewUserFormSubmitHandler} />
      <AllUsers users={users} userDeleteHandler={userDeleteHandler}></AllUsers>
    </div>
  );
};

export default Home;
