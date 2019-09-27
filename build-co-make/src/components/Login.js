import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";

// RELATED TO STYLEC COMPONENTS AND IMPORTING MIXINS
import styled from "styled-components";
import { formMixin, wrappedMixin } from "./mixins";

// styling of wrapping container

const StyledContainer = styled.div`
  ${wrappedMixin};
`;

// styling of login form

const StyledDiv = styled.div`
  ${formMixin}
`;

// sends the user info to backend to be used on

const UserForm = ({ values, errors, touched, status }) => {
  const [user, setUser] = useState({}); //adding so we can see the state after submit but not needed for form.

  useEffect(() => {
    if (status) {
      setUser([...user, status]);
    }
  }, [
    // user, status
  ]);
  return (
    <div>
      <StyledContainer>
        <h1> Login Here! </h1>
        <h2> Not a registered user yet ? </h2>
        <br />
        <Link to="/registration">
          <button> Click here to be one </button>
        </Link>
        <StyledDiv className="form">
          <Form>
            <div className="input-field">
              <label>
                <span> Email </span>
                {touched.email && errors.email && <p> {errors.email} </p>}
                <Field type="text" name="username" placeholder="username" />
              </label>
            </div>
            <br />
            <div className="input-field">
              <label>
                <span> Password </span> <br />
                {touched.password && errors.password && (
                  <p> {errors.password} </p>
                )}
                <Field type="password" name="password" placeholder="password" />
              </label>
            </div>
            <hr />
            <div className="button">
              <button type="submit"> Login </button>
            </div>
          </Form>
        </StyledDiv>
      </StyledContainer>
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    };
  },
  validationSchema: yup.object().shape({
    username: yup
      .string()
      .min("3", "Username must be 3 characters or more")
      .required("You must provide a username."),
    password: yup
      .string()
      .min("4")
      .required("Minimum 4 letters please.")
  }),

  handleSubmit(values, { props }) {
    //console.log("values: ", values);
    axios
      .post(`https://comake.herokuapp.com/api/auth/login`, values)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("message", res.data.message);
        props.history.push("/userHome");
        //console.log("POST res", res.data, values);
      })
      .catch(err => alert(err.response.data.message));
  }
})(UserForm);

export default FormikUserForm;

// render(<FormikUserForm name="" email="" password="" />, document.getElementById('root'))
