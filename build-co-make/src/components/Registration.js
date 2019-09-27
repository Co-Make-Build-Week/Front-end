import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";

// RELATED TO STYLEC COMPONENTS AND IMPORTING MIXINS
import styled from "styled-components";
import { formMixin, wrappedMixin } from "./mixins";

// STYLED COMPONENTS WITH MIXINS

const StyledContainer = styled.div `
  ${wrappedMixin}
`;

const StyledDiv = styled.div `
  ${formMixin}
`;

const UserForm = ({ values, errors, touched, status }) => {
        const [user, setUser] = useState({}); //adding so we can see the state after submit but not needed for form.

        useEffect(() => {
            if (status) {
                setUser(theUser => ({...user, theUser }));
            }
        }, [user, status]);
        return ( <
            StyledContainer >
            <
            h1 > Sign up here! < /h1>{" "} <
            Link to = "/" > { " " }
            Already registered ? < button > Sign in here! < /button>{" "} <
            /Link> <
            StyledDiv className = "form" >
            <
            Form >
            <
            div className = "input-field" >
            <
            label >
            <
            span > Email < /span> <
            br / > {
                touched.email && errors.email && < p > { errors.email } < /p>} <
                Field type = "text"
                name = "username"
                placeholder = "username" / >
                <
                /label> <
                /div>

                <
                br / >
                <
                div className = "input-field" >
                <
                label >
                <
                span > Password < /span> <
                br / > {
                    touched.password && errors.password && ( <
                        p > { errors.password } < /p>
                    )
                } <
                Field type = "password"
                name = "password"
                placeholder = "password" / >
                <
                /label> <
                /div> <
                hr / >
                <
                label className = "tos" >
                <
                span >
                TOS - I agree that I will not use this as a tool to cause undue
                stress to others. <
                /span> <
                Field className = "tos"
                component = "select"
                name = "agreement" >
                <
                option value = "I agree to your TOS" > Agree < /option> <
                option value = "I do not agree with your TOS" > Disagree < /option> <
                /Field> <
                /label> <
                div className = "button" >
                <
                button type = "submit" > Join us! < /button> <
                /div> <
                /Form> <
                /StyledDiv> <
                /StyledContainer>
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
                    .post(`https://comake.herokuapp.com/api/auth/register`, values)
                    .then(res => {
                        //console.log("POST res", res.data);
                        props.history.push("/userHome");
                        localStorage.setItem("userId", res.data.id);
                        localStorage.setItem("token", res.data.token);
                        //console.log(JSON.stringify(values));
                    })
                    .catch(err => alert(err.response.data.message));
            }
        })(UserForm);

        export default FormikUserForm;

        // render(<FormikUserForm name="" email="" password="" />, document.getElementById('root'))