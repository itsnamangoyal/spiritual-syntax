import React from "react";

const UserCard = ({ objectName, user, userDeleteHandler }) => {
  // console.log(objectName, user);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <div className="card-text">Email: {user.email}</div>
        <div className="card-text">Phone: {user.phone}</div>
        <div className="card-text">Gender: {user.gender}</div>
        <div className="card-text">Skills: {user.skills}</div>
        <a className="btn btn-primary" href={objectName}>
          Edit
        </a>
        <button
          className="btn btn-danger"
          style={{ margin: "1rem" }}
          onClick={() => userDeleteHandler({ objectName })}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
