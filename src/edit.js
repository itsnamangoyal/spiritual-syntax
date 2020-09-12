import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const Edit = (props) => {
  const { objectName, baseURL, userUpdateHandler } = props;
  const [user, updateUser] = useState(null);

  const { handleSubmit, register, errors } = useForm();

  useEffect(() => {
    const ac = new AbortController();
    axios
      .get(baseURL + "users/" + objectName + ".json")
      .then(
        (res) => {
          updateUser(res.data);
        },
        [baseURL, objectName]
      )
      .catch(console.error());
    return () => ac.abort(); //will abort all async processes on unmount
  }, [baseURL, objectName]);

  const onFormUpdate = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    let updatedProperty = {};
    switch (name) {
      case "name":
      case "email":
      case "phone":
      case "skills":
      case "gender":
        updatedProperty[name] = value;
        break;
      default:
        return;
    }
    updateUser((user) => {
      return {
        ...user,
        ...updatedProperty,
      };
    });
  };

  return (
    <div className="edit-user">
      {user !== null && (
        <form
          onSubmit={handleSubmit((values) =>
            userUpdateHandler(values, objectName)
          )}
          style={{ maxWidth: "500px", padding: "1rem", margin: "auto" }}
          className="border"
        >
          <h5>Edit User</h5>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              area-aria-describedby="name-input"
              name="name"
              id="name"
              type="name"
              className="form-control"
              ref={register({
                required: "Required",
                pattern: {
                  value: "/^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*//",
                  message: "Name can only contain alphabets",
                },
              })}
              value={user.name}
              onChange={onFormUpdate}
            />
            {errors.name && (
              <small id="nameHelp" className="form-text text-muted">
                {errors.name.message}
              </small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              area-aria-describedby="email-input"
              name="email"
              id="email"
              type="email"
              className="form-control"
              ref={register({
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              value={user.email}
              onChange={onFormUpdate}
            />
            {errors.email && (
              <small id="emailHelp" className="form-text text-muted">
                {errors.email.message}
              </small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              area-aria-describedby="phone-input"
              name="phone"
              id="phone"
              type="phone"
              className="form-control"
              ref={register({
                required: "Required",
                pattern: {
                  value: /^[0-9]{10}$/i,
                  message: "Inavlaid phone number",
                },
              })}
              value={user.phone}
              onChange={onFormUpdate}
            />
            {errors.phone && (
              <small id="phoneHelp" className="form-text text-muted">
                {errors.phone.message}
              </small>
            )}
          </div>

          <label name="gender">Gender</label>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="male"
              ref={register({ required: true })}
              checked={user.gender === "male"}
              onChange={onFormUpdate}
            />
            <label className="form-check-label" htmlFor="name">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="female"
              value="female"
              ref={register({ required: true })}
              checked={user.gender === "female"}
              onChange={onFormUpdate}
            />
            <label className="form-check-label" htmlFor="denger">
              Female
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="skills">Skills</label>
            <select
              className="custom-select"
              ref={register({ required: true })}
              name="skills"
              value={user.skills}
              onChange={onFormUpdate}
            >
              <option selected value="none">
                Select a skill
              </option>
              <option value="UI">UI</option>
              <option value="UX">UX</option>
              <option value="Bakend">Backend</option>
              <option value="CSS">CSS</option>
            </select>
          </div>
          <button className="btn btn-primary" type="submit">
            Update
          </button>

          <a
            className="btn btn-danger"
            style={{ margin: "auto 1rem" }}
            href="/"
          >
            Back
          </a>
        </form>
      )}
    </div>
  );
};

export default Edit;
