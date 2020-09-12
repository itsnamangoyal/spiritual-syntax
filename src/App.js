import React, { useEffect, useState , } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Edit from "./edit";
import axios from "axios";

const baseURL = "https://test-e1c07.firebaseio.com/";

const App = (props) => {
  const [users, updateUsers] = useState({});

  //on load fetch users in db and add it to local users object
  useEffect(() => {
    axios.get(baseURL + "users.json").then((res) => {
      const usersInDb = res.data;
      updateUsers(() => {
        return { ...usersInDb };
      });
    });
  }, []);

  const onNewUserFormSubmitHandler = (values, e) => {
    // console.log(values);
    //extracing values
    const { name, email, phone, gender, skills } = values;
    //calling firbase post endpoint
    axios
      .post(baseURL + "users.json", {
        name,
        email,
        phone,
        gender,
        skills,
      })
      .then((res) => {
        //firebase returns object name only
        const objectName = res.data.name;
        // console.log(objectName);
        //getting details related to recieved objectName from the firebase endpoint. could have used local data here also.
        axios
          .get(baseURL + "users/" + objectName + ".json")
          .then((res) => {
            // console.log(res.data);
            const userData = res.data;
            // console.log(userData);
            updateUsers((oldUsers) => {
              const newUsers = {};
              newUsers[objectName] = userData;
              return {
                ...oldUsers,
                ...newUsers,
              };
            });
            // console.log(users);
            e.target.reset();
          })
          .catch(console.error());
      })
      .catch(console.error());
  };

  // user delete functionality
  const userDeleteHandler = ({ objectName }) => {
    //confirming delete
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    //calling firebase api delete endpoint
    axios.delete(baseURL + "users/" + objectName + ".json").then((res) => {
      //firebase returns 200 status code for successfull.
      if (res.status !== 200) return console.log(res);
      //now upadte local users object
      updateUsers((users) => {
        const newUsers = {};
        //filtering users and making new/updated users object
        Object.entries(users)
          .filter((entry) => entry[0] !== objectName)
          .forEach(
            (filteredEntry) => (newUsers[filteredEntry[0]] = filteredEntry[1])
          );
        return newUsers;
      });
    });
  };
  const userUpdateHandler = (values, objectName) => {
    // console.log(values, objectName);
    if (!window.confirm("Are you sure you want to update user?")) return;
    const { name, email, phone, gender, skills } = values;
    const updateUserData = {
      name,
      email,
      phone,
      gender,
      skills,
    };
    axios
      .patch(baseURL + "users/" + objectName + ".json", updateUserData)
      .then((res) => {
        //means something went wrong
        if (!res.status === 200) return console.log(res);

        updateUsers((users) => {
          const updatedUser = { objectName: updateUserData };
          return {
            ...users,
            ...updatedUser,
          };
        });
        alert('User updated successfully')
      })
      .catch(console.error());
  };

  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          component={() => (
            <Home
              users={users}
              userDeleteHandler={userDeleteHandler}
              onNewUserFormSubmitHandler={onNewUserFormSubmitHandler}
            />
          )}
        />
        <Route
          path="/:objectName"
          exact
          component={(props) => (
            <Edit
              baseURL={baseURL}
              objectName={props.match.params.objectName}
              userUpdateHandler={userUpdateHandler}
            />
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
