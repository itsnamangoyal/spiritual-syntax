import React from "react";
import { useForm } from "react-hook-form";

const NewUserForm = ({ onNewUserFormSubmitHandler }) => {
  const { handleSubmit, register, errors } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onNewUserFormSubmitHandler)}
      style={{ maxWidth: "500px", padding: "1rem", margin: "auto" }}
      className="border"
    >
      <h5>New User</h5>
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
          defaultChecked
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
        >
          <option defaultValue value="none">
            Select a skill
          </option>
          <option value="UI">UI</option>
          <option value="UX">UX</option>
          <option value="Bakend">Backend</option>
          <option value="CSS">CSS</option>
        </select>
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default NewUserForm;
